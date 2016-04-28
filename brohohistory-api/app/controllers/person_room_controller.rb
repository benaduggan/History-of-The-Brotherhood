class PersonRoomController < SuperController
  before_action :check_token
  prepend_before_action :set_class_variables

  # GET /map/semester/year
  def showMap
    query = %Q{
        SELECT pr.*, p.first_name, p.last_name, r.room_num
        FROM person_room AS pr
        INNER JOIN person AS p ON p.id = pr.person_id
        INNER JOIN room AS r ON r.id = pr.room_id
    }
    @result = ActiveRecord::Base.connection.execute(query).to_a
    @result.each do |row|
      ['start_semester', 'end_semester'].each do |dateField|
        row[dateField] = date_to_string(row[dateField])
      end
    end
    render json: @result
  end

  def mapStats
    date = string_to_date(params['semester'] + '-' + params['year']).split('-')
    query = %Q{
      SELECT count(*) / (SELECT sum(num_occupants) FROM room)::float as percent
      FROM person
      WHERE to_date(start_semester, 'YYYY MM DD') <= '#{date[0]} #{date[1]} #{date[2]}' AND
            to_date(end_semester, 'YYYY MM DD') >= '#{date[0]} #{date[1]} #{date[2]}'
    }
    percentage = ActiveRecord::Base.connection.execute(query).to_a[0]['percent']
    render json: {'percent' => (percentage*100).round(2)}
  end

  def create
    ['start_semester', 'end_semester'].each do |dateField|
        params[dateField] = string_to_date(params[dateField])
    end
    super
  end

  def update
    ['start_semester', 'end_semester'].each do |dateField|
        params[dateField] = string_to_date(params[dateField])
    end
    super
  end


  private
    def string_to_date(date_s)
      # This takes the date in the form of Spring-2015 and turns it into a date for postgres
      date_a = date_s.split('-')
      semester_to_month = {"Spring" => '01', 'Fall' => '08'} # 1 for January for Jterm/Spring, 8 for August
      return "#{date_a[1]}-#{semester_to_month[date_a[0]]}-01" # yyyy-mm-dd
    end

    def date_to_string(date)
      # This takes the date in the form of Spring-2015 and turns it into a date for postgres
      date = Date.parse(date)
      month = date.month
      year = date.year
      semester = {1 => "Spring", 8 => "Fall"} # 1 for January for Jterm/Spring, 8 for August  fall 2016 -> 2016-08-01
      return "#{semester[month]}-#{year}"
    end

    def set_class_variables
      @@model_name = 'person_room'
      @@model_fields = ["person_id", "room_id", "start_semester", "end_semester"]
    end
end
