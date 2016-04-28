class PersonController < SuperController
  before_action :check_token
  prepend_before_action :set_class_variables


  def set_class_variables
    @@model_name = 'person'
    @@model_fields = ['first_name', 'last_name', 'start_class', 'start_semester', 'end_semester']
  end

  def index
    @model = ActiveRecord::Base.connection.execute("SELECT * FROM #{@@model_name}").to_a
    @model.each do |row|
      ['start_semester', 'end_semester'].each do |dateField|
        row[dateField] = date_to_string(row[dateField])
      end
    end

    @model.each do |person|
      person['positions'] = ActiveRecord::Base.connection.execute("SELECT * FROM position as p INNER JOIN person_position as pp ON p.id = pp.position_id WHERE pp.person_id = #{person['id']}").to_a
    end
    render json: @model
  end

  def create
    ['start_semester', 'end_semester'].each do |dateField|
        params[dateField] = string_to_date(params[dateField])
    end
    super
  end

  def update
    ['start_semester', 'end_semester'].each do |dateField|
        params[dateField] = string_to_date(params[dateField])
    end
    super
  end

  def show
    if check_id_exists(@@model_name ,params[:id])
      @model_instance = @model_instance.first
      ['start_semester', 'end_semester'].each do |dateField|
        @model_instance[dateField] = date_to_string(@model_instance[dateField])
      end
      render json: @model_instance
    else
      render json: {"errors" => ["The requested resource was not found"]}, status: :not_found
    end
  end

  private
    def string_to_date(date_s)
      # This takes the date in the form of Spring-2015 and turns it into a date for postgres
      date_a = date_s.split('-')
      semester_to_month = {"Spring" => '01', 'Fall' => '08'} # 1 for January for Jterm/Spring, 8 for August
      return "#{date_a[1]}-#{semester_to_month[date_a[0]]}-01" # yyyy-mm-dd
    end

    def date_to_string(date)
      # This takes the date in the form of Spring-2015 and turns it into a date for postgres
      date = Date.parse(date)
      month = date.month
      year = date.year
      semester = {1 => "Spring", 8 => "Fall"} # 1 for January for Jterm/Spring, 8 for August
      return "#{semester[month]}-#{year}"
    end

end
