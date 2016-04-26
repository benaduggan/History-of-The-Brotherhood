class FloorController < SuperController
  prepend_before_action :set_class_variables

  def set_class_variables
    @@model_name = 'floor'
    @@model_fields = ['name', 'description']
  end
end
