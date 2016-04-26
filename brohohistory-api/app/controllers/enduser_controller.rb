class UserController < SuperController
  before_action :set_class_variables

  def set_class_variables
    @@model_name = 'enduser'
    @@model_fields = ["first_name", "last_name", "email", "verified_floor_member", "role", "password"]
  end
end
