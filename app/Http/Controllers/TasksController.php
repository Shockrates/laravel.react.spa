<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreTaskRequest;
use App\Http\Resources\TaskResource;

use App\Http\Traits\HttpResponses;
use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class TasksController extends Controller
{
    use HttpResponses;
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return TaskResource::collection(
            //Task::where('user_id', Auth::user()->id)->get()
            Task::all()
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();

        $task = Task::create([
            'user_id' => Auth::user()->id,
            'name' => $data['name'],
            'description' => $data['description'],
            'priority' => $data['priority']
        ]);

        return new TaskResource($task);
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        if(Auth::user()->id !== $task->user_id){
            return $this->error('','You are not authorized to make this request', 403);
        }
        // $this->isNotAuthorised($task);
        return new TaskResource($task);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {
        if(Auth::user()->id !== $task->user_id){
            return $this->error('','You are not authorized to make this request', 403);
        }
        $task->update($request->all());

        return new TaskResource($task);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        if(Auth::user()->id !== $task->user_id){
            return $this->error('','You are not authorized to make this request', 403);
        }
        
        $task->delete();

        return response(null, 204);
    }


    private function isNotAuthorised($task)
    {
        if(Auth::user()->id !== $task->user_id){
            return $this->error('','You are not authorized to make this request', 403);
        }
    }

}
