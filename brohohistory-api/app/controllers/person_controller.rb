class PersonController < SuperController
  before_action :check_token
  prepend_before_action :set_class_variables

  def set_class_variables
    @@model_name = 'person'
    @@model_fields = ['first_name', 'last_name', 'start_class', 'start_semester', 'end_semester']
  end
end
