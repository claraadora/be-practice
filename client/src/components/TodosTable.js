import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Button,
} from "@material-ui/core";

const useStyles = makeStyles({
    table: {
        minWidth: 800,
    },
});

export default function TodosTable({ todos }) {
    const classes = useStyles();

    const onDeleteTodo = async (id) => {
        await axios.delete(`/api/todos/${id}`);
        todos.push(res);
    };

    return (
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
                        <TableRow key={todo._id}>
                            <TableCell component='th' scope='row'>
                                {todo.date}
                            </TableCell>
                            <TableCell component='th' scope='row'>
                                {todo.description}
                            </TableCell>
                            <TableCell component='th' scope='row'>
                                {todo.isDone}
                            </TableCell>
                            <TableCell component='th' scope='row'>
                                <Button>Toggle</Button>
                                <Button>Edit</Button>
                                <Button>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
