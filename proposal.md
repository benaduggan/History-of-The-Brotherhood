# Ben Duggan and Adam Pogwizd

# The Proposal

## The Idea

It started out with a simple discovery. My DA had lived in my room for three years before I had even stepped foot inside of it! He showed me a hidden token that he had left in the room from his time. This inspired me to start developing a rudimentary model of what this application could look like, and how it might be used by alumni and current students to connect over a shared experience. I started talking to an alumnus of the Brotherhood who currently works in Zondervan Library. He mentioned having a similar idea and we have continued to discuss the scope of this project and how it could be used to preserve the history of the Brotherhood and allow individuals to connect, remember the events from the past, and discover new information about the floor and its members that they had not known before.

## The Scope

Since this application is based around a shared history, we are developing the project with alumni and current students in mind.

We believe that alumni would be interested in reminiscing on their past experience on the floor. They also may be interested in seeing who the new kids on the block are and what has happened to the floor since they have left.

Current students could use this application as a platform to keep track of events as they happen to ensure that the information will not be lost. They also might be interested in exploring the history of the Brotherhood and who lived in their room in the past.

## The Challenges

We suspect that there may be challenges maintaining data integrity when it comes to time ranges that should not overlap. For example, only two people should be allowed to live in a room for a given semester, yet this data will be entered in as a time range.

We also expect designing a intuitive and elegant interface for displaying time-based data could be a challenge, especially when thinking about search.

We want the add the ability to attach pictures to all of the entities as well, which may present a data modeling challenge.

## The Alternatives

A similar application does exist for Harvard University, but it is basically a simple list students who have lived in dorms throughout the entire campus. Our application, however, will be intentionally designed for documenting a living history, and connecting individuals through an intuitively designed, interactive, and fun experience.

# Specification:

A list and description of all the features that you will include in your application (include optional features that you plan to implement if you have time)

## Features

- Develop REST API Endpoints to allow general CRUD operations on the entities described in the ERD
- Develop REST API Endpoints specifically for reporting and aggregating data
- Develop an AngularJS client that utilizes the REST API
- Develop a page that shows people in rooms for a given semester with a cool widget to change the semester selection
- Room pages with the ability to attach meta-data to a room specifically
- User pages detailing information about specific people on a floor
- Position pages detailing the roles of different nicknames and their significance to our history
- Ability to upload pictures for essentially any entity

## Additional Features (if enough time)

- Search functionality across all data
- Ability to attach other forms of media
- Enhance design to include events, artifacts, messaging and notification functionality

# ER Diagram:

Do I put a picture here? Can I put a picture here?

## ER Explanation

### Entities

#### Person

The person entity represents someone who has lived on the Brotherhood at some point in history

#### Permission

The represents a function to enable manipulation of data in this application

#### Picture

Allows individuals to document history and explain what it is

#### Position

This represents a persons nickname on the floor or their role if applicable

#### User

Represents a individuals interactive with the application, not necessarily related to the person entity

#### Floor

Represents data attached the Brotherhood as a whole.

#### Room

Represents a physical location within Samuel Morris Hall

### Relationships

#### Person (assigned) Position

This is meant to represent the nickname of a floor member, or their role such as the Phubs. So that the history can be consolidated and unique to each individual

#### Person (lives in) Room

This records how long and when a person lived in a given room

#### Person (is) User

An optional relationship representing the relationship between a User of the application and a Person as a member of the Brotherhood

#### Floor (contains) Room

This is a simple relationship showing that Rooms exist on a given Floor. There will only ever be one in the scope of this system, but we think it is necessary for recording other meta data in the application.

#### User (has) Permission

This represents the abilities that users possess to view and operate on the data of the application

#### Person User Room Floor (have) Picture

This relationship allows Users to document pictures of other entities within the application

# Database Schema:

The result of mapping your ER diagram into a database schema (mapping algorithm is described in Chapter 9, 9.1 of the textbook)

Picture? Enhanced ERD?
