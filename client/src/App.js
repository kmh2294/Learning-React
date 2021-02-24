import logo from "./logo.svg";
import "./App.css";
import Customer from "./components/Customer";
import React, { Component } from "react";
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
const styles = () => ({
    root: {
        width: "100%",
        overflowX: "auto",
    },
    table: {
        minWidth: 1080,
    },
});

class App extends Component {
    state = {
        customers: "",
    };

    componentDidMount() {
        this.callApi().then((res) => this.setState({ customers: res }));
    }

    callApi = async () => {
        const response = await fetch("/api/customers");
        const body = await response.json();
        return body;
    };
    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableCell>번호</TableCell>
                        <TableCell>이미지</TableCell>
                        <TableCell>이름</TableCell>
                        <TableCell>생년월일</TableCell>
                        <TableCell>성별</TableCell>
                        <TableCell>직업</TableCell>
                    </TableHead>
                    <TableBody>
                        {this.state.customers
                            ? this.state.customers.map((c) => {
                                  return (
                                      <Customer
                                          key={c.id}
                                          id={c.id}
                                          image={c.image}
                                          name={c.name}
                                          birthday={c.birthday}
                                          gender={c.gender}
                                          job={c.job}
                                      />
                                  );
                              })
                            : ""}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

export default withStyles(styles)(App);
