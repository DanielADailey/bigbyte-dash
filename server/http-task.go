package server

import (
	"encoding/json"
	"net/http"

	"github.com/ddailey/bigbyte-dash/db"
	"github.com/lib/pq"
)

func (rs *RestServer) addTask(w http.ResponseWriter, r *http.Request) {
	taskObject := &TaskPacket{}
	if err := json.NewDecoder(r.Body).Decode(&taskObject); err != nil {
		w.Write([]byte("Error decoding post body"))
		return
	}
	taskDbTransform := &db.Task{
		Title:           taskObject.Title,
		TaskDescription: taskObject.TaskDescription,
		StartTime:       taskObject.StartTime,
		EndTime:         taskObject.EndTime,
		Status:          taskObject.Status,
		GroupId:         taskObject.GroupId,
		CreatedBy:       taskObject.CreatedBy,
		AssignedTo:      taskObject.AssignedTo,
		Comments:        make(pq.StringArray, 0),
	}
	rs.addDbTask(taskDbTransform)
}

func (rs *RestServer) getTasks(w http.ResponseWriter, r *http.Request) {
	tasks := rs.getDbTasks()
	if len(tasks) > 0 {
		buf, err := json.Marshal(tasks)
		if err != nil {
			return
		}
		w.Write(buf)
	}
}
