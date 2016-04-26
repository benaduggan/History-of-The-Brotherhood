class PersonRoomController < SuperController
  before_action :set_class_variables

  def set_class_variables
    @@model_name = 'person_room'
    @@model_fields = ["person_id", "room_id", "start_semester", "end_semester"]
  end
end
