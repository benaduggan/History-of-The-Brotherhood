class PersonPositionController < SuperController
  prepend_before_action :set_class_variables

  def set_class_variables
    @@model_name = 'person_position'
    @@model_fields = ["person_id", "position_id", "description", "start_semester", "end_semester"]
  end
end
