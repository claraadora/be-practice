import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
    Grid,
} from "@material-ui/core";
import { green, red } from "@material-ui/core/colors";

const useStyles = makeStyles({
    table: {
        minWidth: 800,
    },
    rowDone: {
        backgroundColor: green[300],
    },
    rowNotDone: {
        backgroundColor: red[300],
    },
});

export default function TodoPage() {
    const [newTodo, setNewTodo] = useState("");
    const [todos, setTodos] = useState([]);
    const classes = useStyles();

    useEffect(() => {
        const fetchTodos = async () => {
            const res = await axios.get("/api/todos");
            setTodos(res.data);
        };
        fetchTodos();
    }, []);

    // CREATE
    const onSubmitTodo = async (e) => {
        e.preventDefault();

        const config = {
            headers: { "Content-Type": "application/json" },
        };
        const body = JSON.stringify({ description: newTodo });

        const res = await axios.post("/api/todos", body, config);

        setNewTodo("");
        console.log(res);
        const temp = [...todos];
        temp.push(res.data);
        setTodos(temp);
    };

    // DELETE
    const onDeleteTodo = async (id) => {
        try {
            const config = {
                headers: { "Content-Type": "application/json" },
            };
            await axios.delete(`/api/todos/${id}`, config);
            const temp = todos.filter((todo) => todo._id !== id);
            setTodos(temp);
        } catch (err) {
            console.log(err);
        }
    };

    // EDIT
    const onEditTodo = async (id, updatedTodo) => {
        try {
            const config = {
                headers: { "Content-Type": "application/json" },
            };
            const body = JSON.stringify(updatedTodo);
            await axios.put(`/api/todos/${id}`, body, config);

            const temp = todos.map((todo) => {
                if (todo._id === id) {
                    return updatedTodo;
                }
                return todo;
            });
            setTodos(temp);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <Grid container justify='center' alignItems='center' spacing={5}>
            <Grid item xs={12} />
            {/** ADD TODO TEXT FIELD */}
            <Grid item>
                <form onSubmit={onSubmitTodo}>
                    <TextField
                        id='newTodo'
                        name='description'
                        onChange={(e) => setNewTodo(e.target.value)}
                        value={newTodo}
                        variant='filled'
                    />
                </form>
            </Grid>
            <Grid item xs={12} />
            {/** TODO TABLE */}
            <Grid item>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <TableCell>Date</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {todos.map((todo) => (
                                <TableRow
                                    key={todo._id}
                                    className={
                                        todo.isDone
                                            ? classes.rowDone
                                            : classes.rowNotDone
                                    }>
                                    <TableCell component='th' scope='row'>
                                        {todo.date}
                                    </TableCell>
                                    <TableCell component='th' scope='row'>
                                        {todo.description}
                                    </TableCell>
                                    <TableCell component='th' scope='row'>
                                        <Button
                                            onClick={() =>
                                                onEditTodo(todo._id, {
                                                    ...todo,
                                                    isDone: !todo.isDone,
                                                })
                                            }>
                                            Toggle
                                        </Button>
                                        <Button>Edit</Button>
                                        <Button
                                            onClick={() =>
                                                onDeleteTodo(todo._id)
                                            }>
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Grid>
        </Grid>
    );
}
