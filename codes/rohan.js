const a=[
    [0,0,0],
    [0,0,0],
    [0,0,0],
]
//create a matrix
function insert_component(x,y,id)
{
    a[x][y]=id;
}
function copy_component(x1,x2,y1,y2)
{
    a[y1][y2]=a[x1][x2];
}
function insert