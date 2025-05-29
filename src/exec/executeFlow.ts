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
