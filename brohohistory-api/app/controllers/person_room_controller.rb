class PersonRoomController < SuperController
  prepend_before_action :set_class_variables

  # GET /map/semester/year
  def showMap
    query = %Q{
        SELECT *
        FROM person_room AS pr
        INNER JOIN person AS p ON p.id = pr.person_id
        INNER JOIN room AS r ON r.id = pr.room_id
    }
    @result = ActiveRecord::Base.connection.execute(query)
    render json: [{"room" => '301', "occupants" => [{'id' => 1, 'name' => 'ben'}, {'id' => 2, 'name' => 'ryan'}]}]
  end





  def set_class_variables
    @@model_name = 'person_room'
    @@model_fields = ["person_id", "room_id", "start_semester", "end_semester"]
  end
end
