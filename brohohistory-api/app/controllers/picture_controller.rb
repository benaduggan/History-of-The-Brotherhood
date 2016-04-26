class PictureController < SuperController
  prepend_before_action :set_class_variables

  def set_class_variables
    @@model_name = 'picture'
    @@model_fields = ["type", "type_id", "title", "description", "url"]
  end
end
