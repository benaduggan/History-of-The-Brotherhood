class PositionController < SuperController
  before_action :set_class_variables

  def set_class_variables
    @@model_name = 'position'
    @@model_fields = ["title", "description", "recurring"]
  end
end
