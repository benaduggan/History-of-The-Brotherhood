class SuperController < ActionController::API
  # before_action :set_model_instance, only: [:show, :update, :destroy]
  @@model_name = "person"
  # GET /<model>
  def index
    @model = ActiveRecord::Base.connection.execute("SELECT * FROM #{@@model_name}").to_h
    render json: @model
  end

  

end

  #
  # # GET /todos/1
  # def show
  #   render json: @todo
  # end
  #
  # # POST /todos
  # def create
  #   @todo = Todo.new(todo_params)
  #
  #   if @todo.save
  #     render json: @todo, status: :created, location: @todo
  #   else
  #     render json: @todo.errors, status: :unprocessable_entity
  #   end
  # end
  #
  # # PATCH/PUT /todos/1
  # def update
  #   if @todo.update(todo_params)
  #     render json: @todo
  #   else
  #     render json: @todo.errors, status: :unprocessable_entity
  #   end
  # end
  #
  # # DELETE /todos/1
  # def destroy
  #   @todo.destroy
  # end
  #
  # private
  #   # Use callbacks to share common setup or constraints between actions.
  #   def set_todo
  #     @todo = Todo.find(params[:id])
  #   end
  #
  #   # Only allow a trusted parameter "white list" through.
  #   def todo_params
  #     params.require(:todo).permit(:title, :completed, :order)
  #   end
