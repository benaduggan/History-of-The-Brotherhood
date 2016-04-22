class PersonPositionController < SuperController
  @@model_name = 'person_position'
  @@model_fields = ['id', "person_id", "position_id", "description", "start_semester", "end_semester"]

end
