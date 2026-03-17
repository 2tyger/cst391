# Milestone 2

- Author:  Ty Gilbert
- Date:  16 March 2026

This is ***Milestone 2: Refined Project Proposal***. Below is an overview of my proposed project program *Prayer Request Tracker*. This submission can be divided into multiple sections. Please review the table of contents for this submission:

1. Instructor Feedback
2. Introduction / Overview
3. Functionality Requirements / User Stories
4. Initial Database Design / ER Diagram
5. Initial UI Sitemap
6. Initial UI Wireframes
7. Initial UML Classes
8. REST Endpoints
9. API Example API Requests
10. Risks
11. Conclusion

---

## 1: Instructor Feedback

No instructor feedback was provided to me per my submission to Milestone 1. Thus, no changes can be made to adhere to instructor feedback. However, since I do not want to submit the same exact proposal as last time, I have chosen to convert all the diagrams (except for the wireframes) into their MD language and Mermaid counterparts.

## 2: Introduction / Overview

The proposal that I have for this project is to design and develop a web application called the *Prayer Request Tracker*. This application will allow users to create, view, update, and delete prayer requests in a centralized system. The application will support users who want to keep track of prayer needs within a church, ministry group, personal devotional practice, or other context.

The system will store prayer requests inside of a MySQL database and then expose the data through a RESTful API that is built using Node.js and Express. Two separate front-end web applications will interact with the same backend API. The first implementation will use the Angular JS framework, and then the second implementation will use the React JS framework.

The application will demonstrate full stack architecture consisting of a database layer, a backend REST API, and two independent frontend clients. As already mentioned, the system will support basic CRUD operations for managing the prayer requests.


## 3: Functionality Requirements / User Stories

1. **View Prayer Requests**
   1. As a user, I want to be able to view a list of all prayer requests so that I can see what needs prayer.
2. **Create Prayer Request**
   1. As a user, I want to add a new prayer request so that I can record something that needs prayer.
3. **View Prayer Request Details**
   1. As a user, I want to be able to open a prayer request so that I can read the full description of the prayer so that I know what to pray for.
4. **Update Prayer Request**
   1. As a user, I want to be able to edit an existing prayer request so that I can update its information.
5. **Delete Prayer Request**
   1. As a user, I want to be able to delete a prayer request so that I can remove requests that are no longer needed.
6. **Mark Prayer Request as Answered**
   1. As a user, I want to be able to mark a prayer request as answered so that I can track when prayers have been fulfilled.

## 4: Initial Database Design / ER Diagram:

The database design is basic, and at its current state has only one table:

### PrayerRequest

|Field|Type|Notes|
|-|-|-|
|id|INT|PK|
|title|VARCHAR||
|description|TEXT||
|category|VARCHAR||
|dateSubmitted|DATE||
|isAnswered|BOOLEAN||
|priorityLevel|INT||

## 5: Initial UI Sitemap

This application only manages one product type, so the sitemap diagram only has one diagram:

### PrayerRequest

|Field|Type|Notes|Description|
|-|-|-|-|
|id|INT|PK|Unique identifier for each prayer request|
|title|VARCHAR||Short title of the prayer request|
|description|TEXT||Detailed description of the prayer request|
|category|VARCHAR||Category such as Health, Family, Work, etc.|
|dateSubmitted|DATE||Date the prayer request was submitted|
|isAnswered|BOOLEAN||Indicates whether the prayer request has been answered|
|priorityLevel|INT||Priority level indicating the urgency|

## 6: Initial UI Wireframes

These wireframes will provide a reference for what is required of the UI, and introductory look at the overall design of the final application. I designed 4 wireframe diagrams, each will get there own section:

### Wireframe 1: Home Page

![Wireframe1Home](Wireframe1Home.png)

This is a look at the home page, on the Home Page you can see that we are able to add new prayer requests, view general details about prayer requests, search and filter through existing prayer requests, and interact with each prayer request that is displayed. This view is assuming that you own all the prayer requests, users will only be able to interact (edit or delete) prayer requests that they own, otherwise, they will only have access to the 'Details' link.

### Wireframe 2: Create Prayer Requests Page

![Wireframe2Create](Wireframe2Create.png)

On this page, users will be able to create a new prayer request. They can include a title, description, category (i.e. Health), priority level, and flag whether the prayer has been answered or not.

### Wireframe 3: Prayer Request Details Page

![Wireframe3Details](Wireframe3Details.png)

On this page, users can view details of a prayer request. In prayer requests where the description is two long to view on the home page, this page will provide them full access to the entirety of the description.

### Wireframe 4: Edit Prayer Request Page

![Wireframe4Edit](Wireframe4Edit.png)

On this page, users are able to edit prayer requests that they own. This allows them to update the details of the prayer request such as title, description, category (i.e. Health), priority level, and flag whether the prayer has been answered or not.

## 7: Initial UML Classes

This UML class diagram shows the structure of my proposed backend design:

```mermaid
classDiagram

class PrayerRequestController {
  +getAllRequests()
  +getRequestById(id)
  +createRequest(req)
  +updateRequest(id, req)
  +deleteRequest(id)
}

class PrayerRequestService {
  +getAllRequests()
  +getRequestById(id)
  +createRequest(req)
  +updateRequest(id, req)
  +deleteRequest(id)
}

class PrayerRequestRepository {
  +findAll()
  +findById(id)
  +save(req)
  +update(id, req)
  +delete(id)
}

class PrayerRequest {
  -id : int
  -title : string
  -description : string
  -category : string
  -dateSubmitted : Date
  -isAnswered : boolean
  -priorityLevel : int
}

PrayerRequestController --> PrayerRequestService
PrayerRequestService --> PrayerRequestRepository
PrayerRequestService --> PrayerRequest
```

## 8: REST Endpoints

The endpoints used in this application support full CRUD operations for managing prayer requests.

|Method|Endpoint|Description|
|-|-|-|
|GET|/requests|Retrieve all prayer requests|
|GET|/requests/:id|Retrieve a specific prayer request by ID|
|POST|/requests|Create a new prayer request|
|PUT|/requests/:id|Update an existing prayer request|
|DELETE|/requests/:id|Delete a prayer request|
|PATCH |/requests/:id/answer|Mark a prayer request as answered|

## 9: API Example API Requests

This segment covers example api requests and their json responses per the ones defined in 8: REST Endpoints

- GET /requests
```json
Response:
[
  {
    "id": 1,
    "title": "Prayer for Surgery",
    "description": "Please pray for a successful surgery and recovery.",
    "category": "Health",
    "dateSubmitted": "2026-03-09",
    "isAnswered": false,
    "priorityLevel": 3
  },
  {
    "id": 2,
    "title": "Job Guidance Prayer",
    "description": "Pray for direction in my career and job opportunities.",
    "category": "Work",
    "dateSubmitted": "2026-03-09",
    "isAnswered": true,
    "priorityLevel": 2
  }
]
```

- GET /requests/1

```json
Response:
{
  "id": 1,
  "title": "Prayer for Surgery",
  "description": "Please pray for a successful surgery and a quick recovery.",
  "category": "Health",
  "dateSubmitted": "2026-03-09",
  "isAnswered": false,
  "priorityLevel": 3
}
```

- POST /requests

```json
Request Body:
{
  "title": "Family Healing Prayer",
  "description": "Please pray for healing within my family.",
  "category": "Family",
  "priorityLevel": 2,
  "isAnswered": false
}

Response:
{
  "id": 3,
  "message": "Prayer request created successfully"
}
```

- PUT /requests/1

```json
Request Body:
{
  "title": "Prayer for Upcoming Surgery",
  "description": "Updated description...",
  "category": "Health",
  "priorityLevel": 4,
  "isAnswered": false
}

Response:
{
  "message": "Prayer request updated successfully"
}
```

- PATCH /requests/1/answer

```json
Response:
{
  "message": "Prayer request marked as answered"
}
```

DELETE /requests/1
```json
Response:
{
  "message": "Prayer request deleted successfully"
}
```

## 10: Risks

I can think of several risks going into this project...

1. **Learning Curve of Frameworks**
   1. Both Angular and React will be used to implement the front-end application. Differences between these frameworks might require me to spend some additional time to understand it correctly and implement accordingly.
2. **API Consistency**
   1. The backend REST API needs to be designed in a way that supports both Angular and React front-end applications without requiring changes to the API design.
3. **Time Management**
   1. Building two separate front-end applications connected to the same backend service is going to require me to be careful with my time management between the Milestone deliverable dates.

## 11: Conclusion

By creating this proposal, I gained a better understanding of how to plan and structure a full-stack application before development begins. Instead of just jumping straight into coding the application, I learned the importance of documenting various aspects of an application's design. This will make the application much easier to develop once I begin.

---

Thank you for taking the time to look through my proposal. 

***Additional Note:** Wireframe diagrams were made with Visio. The rest of the diagrams were made in native MD language and mermaid.*