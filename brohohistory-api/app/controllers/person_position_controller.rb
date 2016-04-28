class PersonPositionController < SuperController
  before_action :check_token
  prepend_before_action :set_class_variables

  def create
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
      semester = {1 => "Spring", 8 => "Fall"} # 1 for January for Jterm/Spring, 8 for August
      return "#{semester[month]}-#{year}"
    end

    def set_class_variables
      @@model_name = 'person_position'
      @@model_fields = ["person_id", "position_id", "description", "start_semester", "end_semester"]
    end
end
