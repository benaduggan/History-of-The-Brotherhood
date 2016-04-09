class TestsController < ApplicationController
  ActionController::Parameters.permit_all_parameters = true

  # GET /tests
  def index
    @tests = ActiveRecord::Base.connection.execute("SELECT * FROM tests")
    render json: @tests
  end


  # PATCH/PUT /notes/1
  def update
    byebug
    @x = ActiveRecord::Base.connection.execute("UPDATE tests SET name='#{params['name']}' WHERE id=#{params['id']}")
    if @x
      render json: ActiveRecord::Base.connection.execute("SELECT * FROM tests WHERE id=#{params['id']}")
    else
      render json: "didn't work"
    end
  end

end
