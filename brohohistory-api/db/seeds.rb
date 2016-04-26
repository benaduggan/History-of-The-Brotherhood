# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


def get_or_create_floor
  floor_id = ActiveRecord::Base.connection.execute("SELECT id FROM floor WHERE name = 'The Brotherhood'")
  if floor_id.nil?
    query = "INSERT INTO floor (name, description) VALUES ('The Brotherhood', 'An awesome place to live')"
    x = ActiveRecord::Base.connection.execute(query)
    return x.first[0]
  else
    return floor_id.first['id']
  end
end

def create_rooms
  single_rooms = [314, 315, 316, 317, 331, 332] # check that this is true
  floor_id = get_or_create_floor()
  (301...345).each do |room_number|
    if single_rooms.include? room_number
      num_occupants = 1
    else
      num_occupants = 2
    end
    query = "INSERT INTO room (floor_id, room_num, num_occupants) VALUES (#{floor_id}, #{room_number}, #{num_occupants})"
    ActiveRecord::Base.connection.execute(query)
  end
end

create_rooms()
