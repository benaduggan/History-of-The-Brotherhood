class SuperController < ActionController::API
  require 'time'
  before_action :set_model_instance, only: [:show, :update, :destroy]

  @@model_fields = []
  @@model_name = ""

  # GET /<model>
  def index
    @model = ActiveRecord::Base.connection.execute("SELECT * FROM #{@@model_name}")
    render json: @model
  end

  # GET /todos/1
  def show
    if check_id_exists(@@model_name ,params[:id])
      render json: @model_instance.first
    else
      render json: {"errors" => ["The requested resource was not found"]}, status: :not_found
    end
  end

  # POST /todos
  def create
    values_a = []
    @@model_fields.each do |field|
        values_a.append([field, params[field]])
    end
    if save_model(values_a)
      render json: values_a, status: :created
    else
      render json: "an error occured, not saved", status: :unprocessable_entity
    end
  end

  # PATCH/PUT /todos/1
  def update
    values_a = []
    @@model_fields.each do |field|
        values_a.append([field, params[field]])
    end

    if update_model(params[:id], values_a)
      set_model_instance()
      render json: @model_instance.first, status: :ok
    else
      render json: "problem", status: :unprocessable_entity
    end
  end

  # DELETE /todos/1
  def destroy
    return ActiveRecord::Base.connection.execute("DELETE FROM #{@@model_name} WHERE id = #{params['id']}")
  end

  protected
    def check_token
      token_value = request.headers['token']
      token = ActiveRecord::Base.connection.execute("SELECT * FROM token WHERE value = '#{token_value}'").first
      if token.nil? or token_expired?(token)
        render json: "token does not exist or is expired", status: :not_found
      end
    end

  private
    def set_model_instance
      query = "SELECT * FROM #{@@model_name} WHERE id = #{params[:id]}"
      @model_instance = ActiveRecord::Base.connection.execute(query)
    end

    def check_id_exists(model_name, id)
      query = "SELECT id FROM #{model_name} WHERE id = #{id}"
      return ActiveRecord::Base.connection.execute(query).to_a.length > 0
    end

    def token_expired?(token)
      if Time.now < Time.parse(token['created_at']) + (60*60*24)
        ActiveRecord::Base.connection.execute("DELETE FROM token WHERE value='#{token['value']}'")
        return true
      else
        return false
      end
    end

    def save_model(values)
      field_names_string = ""
      field_values_string = ""
      values.each do |value|
        if value[1].class == String
            value[1] = "'" + value[1] + "'"
        end
        field_values_string += value[1].to_s + ', '
        field_names_string += value[0].to_s + ', '
      end
      query = "INSERT INTO #{@@model_name} (#{field_names_string[0..-3]}) VALUES (#{field_values_string[0..-3]});"
      return ActiveRecord::Base.connection.execute(query)
    end

    def update_model(id, values)
      query = "UPDATE #{@@model_name} SET "
      where = "WHERE id = #{id};"
      values.each do |value|
        next if value[0] == 'id'

        if value[1].class == String
            value[1] = "'" + value[1] + "'"
        end
        query += value[0].to_s + '=' + value[1].to_s + ', '
      end
      query = query[0..-3] + " " + where
      return ActiveRecord::Base.connection.execute(query)
    end
end
