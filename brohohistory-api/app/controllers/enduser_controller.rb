class EnduserController < SuperController
  before_action :check_token, only: [:show, :update, :index, :destroy]
  prepend_before_action :set_class_variables

  def set_class_variables
    @@model_name = 'enduser'
    @@model_fields = ["first_name", "last_name", "email", "verified_floor_member", "role", "password"]
  end

  def create
    encrypted = BCrypt::Password.create(params['password'])
    params['password'] = encrypted.to_s
    super
  end

  def update
    encrypted = BCrypt::Password.create(params['password'])
    params['password'] = encrypted.to_s
    super
  end

  def login
    if user = valid_user? and valid_password?(user)
      token = loop do
          random_t = SecureRandom.urlsafe_base64
          break random_t unless token_exists?(random_t)
      end
      ActiveRecord::Base.connection.execute("INSERT INTO token (enduser_id, value, created_at) VALUES ('#{user['id']}', '#{token}', '#{Time.now}')")
      render json: {token: token, user:user}

    else
      render json: {"errors" => ["The requested resource was not found"]}, status: :not_found
    end
  end

  def logout
    token = request.headers['token']
    ActiveRecord::Base.connection.execute("DELETE FROM token WHERE value='#{token}'")
    render status: 204
  end

  private
  def valid_user?
    return ActiveRecord::Base.connection.execute("SELECT * FROM enduser WHERE email = '#{params['email']}'").first
  end

  def token_exists?(token_value)
    return ActiveRecord::Base.connection.execute("SELECT * FROM token WHERE value = '#{token_value}'").first
  end

  def valid_password?(user)
    return BCrypt::Password.new(user['password']) == params['password']
  end

end
