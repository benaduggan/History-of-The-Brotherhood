class RoomController < SuperController
  before_action :check_token
  prepend_before_action :set_class_variables

  def set_class_variables
    @@model_name = 'room'
    @@model_fields = ["floor_id", "room_num", "num_occupants"]
  end
end
