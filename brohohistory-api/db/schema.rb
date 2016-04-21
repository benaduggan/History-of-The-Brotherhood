# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 0) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "enduser", id: :integer, force: :cascade do |t|
    t.text    "first_name",                      null: false
    t.text    "last_name",                       null: false
    t.text    "email",                           null: false
    t.integer "verified_floor_member", limit: 2
    t.text    "role",                            null: false
    t.text    "password",                        null: false
  end

  create_table "floor", id: :integer, force: :cascade do |t|
    t.text "name",        null: false
    t.text "description"
  end

  create_table "person", id: :integer, force: :cascade do |t|
    t.text "start_class",    null: false
    t.text "first_name",     null: false
    t.text "last_name",      null: false
    t.text "start_semester", null: false
    t.text "end_semester",   null: false
  end

  create_table "person_position", id: :integer, force: :cascade do |t|
    t.integer "person_id"
    t.integer "position_id"
    t.text    "description"
    t.date    "start_semester"
    t.date    "end_semester"
  end

  create_table "person_room", id: :integer, force: :cascade do |t|
    t.integer "person_id"
    t.integer "room_id"
    t.text    "start_semester", null: false
    t.text    "end_semester",   null: false
  end

  create_table "picture", id: :integer, force: :cascade do |t|
    t.text    "type",        null: false
    t.integer "type_id",     null: false
    t.text    "title",       null: false
    t.text    "description"
    t.text    "url",         null: false
  end

  create_table "position", id: :integer, force: :cascade do |t|
    t.text    "title",                 null: false
    t.text    "description"
    t.integer "recurring",   limit: 2, null: false
  end

  create_table "room", id: :integer, force: :cascade do |t|
    t.integer "floor_id"
    t.integer "room_num",      null: false
    t.integer "num_occupants", null: false
  end

  add_foreign_key "person_position", "\"position\"", column: "position_id", name: "person_position_position_id_fkey"
  add_foreign_key "person_position", "person", name: "person_position_person_id_fkey"
  add_foreign_key "person_room", "person", name: "person_room_person_id_fkey"
  add_foreign_key "person_room", "room", name: "person_room_room_id_fkey"
  add_foreign_key "room", "floor", name: "room_floor_id_fkey"
end
