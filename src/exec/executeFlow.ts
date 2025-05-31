import { useReactFlow } from "@xyflow/react";

export class Stack<T> {
    private items: T[];

    constructor() {
        this.items = [];
    }

    push(element: T): void {
        this
            .items.push(element);
    }

    pop(): T | undefined {
        return this
            .items.pop();
    }

    peek(): T | undefined {
        return this
            .items[this.items.length - 1];
    }

    isEmpty(): boolean {
        return this
            .items.length === 0;
    }

    size(): number {
        return this
            .items.length;
    }

    clear(): void {
        this.items = [];
    }

    print(): void {
        console.log(this.items);
    }
}

/*

When the execute button is pressed:

execStack = []

fn executeFlow():
    list = getNodesList()
    for each node in list:
        if node.type in outputTypes:
            execStack.append(node.id)
    
    while execStack not empty:
        ready = true
        PEEK at top
        if top is executed:
            execStack.pop()
            continue
        
        for connections in top.inputs:
            if connection not executed:
                ready = false
                execStack.append(connection.id)
        
        if ready:
            node = execStack.pop()
            node.execute()


*/