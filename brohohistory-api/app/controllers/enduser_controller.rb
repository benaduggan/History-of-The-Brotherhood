class UserController < SuperController
  @@model_name = 'enduser'
  @@model_fields = ['id', "first_name", "last_name", "email", "verified_floor_member", "role", "password"]

end
