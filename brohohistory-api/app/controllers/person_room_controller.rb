class PersonRoomController < SuperController
  @@model_name = 'person_room'
  @@model_fields = ['id', "person_id", "room_id", "start_semester", "end_semester"]

end
