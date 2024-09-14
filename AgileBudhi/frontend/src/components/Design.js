import React, { useState } from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import ShareIcon from '@mui/icons-material/Share';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import ViewKanbanIcon from '@mui/icons-material/ViewKanban';
import ViewListIcon from '@mui/icons-material/ViewList';
import TableChartIcon from '@mui/icons-material/TableChart';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: theme.shape.borderRadius * 2,
  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  boxShadow: '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)',
}));

const ContentBox = styled(Box)(({ theme }) => ({
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(3),
  backdropFilter: 'blur(10px)',
}));

const GlowingButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
  border: 0,
  borderRadius: 3,
  boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  color: 'white',
  height: 48,
  padding: '0 30px',
  margin: theme.spacing(1),
  '&:hover': {
    background: 'linear-gradient(45deg, #FE8B8B 30%, #FFAE73 90%)',
    boxShadow: '0 5px 7px 2px rgba(255, 105, 135, .5)',
  },
}));

const KanbanColumn = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(1),
  minWidth: 250,
  backgroundColor: 'rgba(255, 255, 255, 0.8)',
}));

const TaskCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  margin: theme.spacing(1),
  backgroundColor: 'white',
}));

export default function Design() {
  const [requirements, setRequirements] = useState('');
  const [deadline, setDeadline] = useState('');
  const [aiSuggestion, setAiSuggestion] = useState('');
  const [tasks, setTasks] = useState({
    'To Do': [
      { id: 'task-1', content: 'Create wireframes' },
      { id: 'task-2', content: 'Design UI components' },
    ],
    'In Progress': [
      { id: 'task-3', content: 'Implement responsive layout' },
    ],
    'Done': [
      { id: 'task-4', content: 'Define color scheme' },
    ],
  });
  const [view, setView] = useState('kanban');
  const [openAddTask, setOpenAddTask] = useState(false);
  const [newTaskContent, setNewTaskContent] = useState('');
  const [newTaskStatus, setNewTaskStatus] = useState('To Do');

  const handleShare = () => {
    console.log('Sharing:', { requirements, deadline, aiSuggestion });
    alert('Sharing functionality would be implemented here.');
  };

  const generateAiSuggestion = () => {
    setAiSuggestion(`Based on your requirements, consider the following:
1. Prioritize user experience design
2. Implement responsive layouts
3. Use a modular component structure
4. Integrate accessibility features
5. Plan for scalability and future updates`);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceColumn = source.droppableId;
    const destColumn = destination.droppableId;

    if (sourceColumn === destColumn) {
      const newColumn = Array.from(tasks[sourceColumn]);
      const [reorderedItem] = newColumn.splice(source.index, 1);
      newColumn.splice(destination.index, 0, reorderedItem);

      setTasks({
        ...tasks,
        [sourceColumn]: newColumn,
      });
    } else {
      const sourceItems = Array.from(tasks[sourceColumn]);
      const destItems = Array.from(tasks[destColumn]);
      const [movedItem] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, movedItem);

      setTasks({
        ...tasks,
        [sourceColumn]: sourceItems,
        [destColumn]: destItems,
      });
    }
  };

  const handleAddTask = () => {
    if (newTaskContent.trim() !== '') {
      const newTask = {
        id: `task-${Date.now()}`,
        content: newTaskContent,
      };
      setTasks(prevTasks => ({
        ...prevTasks,
        [newTaskStatus]: [...prevTasks[newTaskStatus], newTask],
      }));
      setNewTaskContent('');
      setOpenAddTask(false);
    }
  };

  const renderKanbanBoard = () => (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box display="flex" justifyContent="space-between">
        {Object.entries(tasks).map(([columnId, column]) => (
          <Droppable droppableId={columnId} key={columnId}>
            {(provided, snapshot) => (
              <KanbanColumn
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  background: snapshot.isDraggingOver
                    ? 'lightblue'
                    : 'rgba(255, 255, 255, 0.8)',
                }}
              >
                <Typography variant="h6">{columnId}</Typography>
                {column.map((task, index) => (
                  <Draggable key={task.id} draggableId={task.id} index={index}>
                    {(provided, snapshot) => (
                      <TaskCard
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          ...provided.draggableProps.style,
                          backgroundColor: snapshot.isDragging
                            ? '#f0f0f0'
                            : 'white',
                        }}
                      >
                        {task.content}
                      </TaskCard>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </KanbanColumn>
            )}
          </Droppable>
        ))}
      </Box>
    </DragDropContext>
  );

  const renderTableView = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Task</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(tasks).flatMap(([status, taskList]) =>
            taskList.map(task => (
              <TableRow key={task.id}>
                <TableCell>{task.content}</TableCell>
                <TableCell>{status}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderListView = () => (
    <List>
      {Object.entries(tasks).flatMap(([status, taskList]) =>
        taskList.map(task => (
          <ListItem key={task.id}>
            <ListItemText primary={task.content} secondary={status} />
          </ListItem>
        ))
      )}
    </List>
  );

  return (
    <StyledPaper elevation={10}>
      <ContentBox>
        <Typography variant="h4" gutterBottom sx={{ color: '#4a4a4a', fontWeight: 'bold' }}>
          AI-Enhanced Design
        </Typography>
        <Typography variant="body1" paragraph sx={{ color: '#666' }}>
          Welcome to the future of project design. Let AI assist you in managing all aspects of your project's design phase.
        </Typography>
        
        <Box component="form" noValidate autoComplete="off" sx={{ mt: 3 }}>
          <TextField
            fullWidth
            label="Business Requirements"
            multiline
            rows={4}
            value={requirements}
            onChange={(e) => setRequirements(e.target.value)}
            margin="normal"
            variant="outlined"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
          <TextField
            fullWidth
            label="Project Deadline"
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
            margin="normal"
            variant="outlined"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2, mb: 2 }}>
            <GlowingButton
              variant="contained"
              startIcon={<AutoAwesomeIcon />}
              onClick={generateAiSuggestion}
            >
              Generate AI Suggestion
            </GlowingButton>
            <GlowingButton
              variant="contained"
              startIcon={<ShareIcon />}
              onClick={handleShare}
            >
              Share Requirements
            </GlowingButton>
          </Box>
          {aiSuggestion && (
            <Box sx={{ mt: 2, mb: 2, backgroundColor: 'rgba(0, 0, 0, 0.05)', p: 2, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ color: '#4a4a4a' }}>
                AI Suggestion:
              </Typography>
              <Typography variant="body1" sx={{ color: '#666' }}>
                {aiSuggestion}
              </Typography>
            </Box>
          )}
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom sx={{ color: '#4a4a4a', fontWeight: 'bold' }}>
            Task Management
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <ToggleButtonGroup
              value={view}
              exclusive
              onChange={(e, newView) => newView && setView(newView)}
              aria-label="view selector"
            >
              <ToggleButton value="kanban" aria-label="kanban view">
                <ViewKanbanIcon />
              </ToggleButton>
              <ToggleButton value="table" aria-label="table view">
                <TableChartIcon />
              </ToggleButton>
              <ToggleButton value="list" aria-label="list view">
                <ViewListIcon />
              </ToggleButton>
            </ToggleButtonGroup>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenAddTask(true)}
            >
              Add Task
            </Button>
          </Box>
          {view === 'kanban' && renderKanbanBoard()}
          {view === 'table' && renderTableView()}
          {view === 'list' && renderListView()}
        </Box>
      </ContentBox>

      <Dialog open={openAddTask} onClose={() => setOpenAddTask(false)}>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task Description"
            type="text"
            fullWidth
            variant="outlined"
            value={newTaskContent}
            onChange={(e) => setNewTaskContent(e.target.value)}
          />
          <TextField
            select
            margin="dense"
            label="Status"
            fullWidth
            variant="outlined"
            value={newTaskStatus}
            onChange={(e) => setNewTaskStatus(e.target.value)}
            SelectProps={{
              native: true,
            }}
          >
            {Object.keys(tasks).map((status) => (
              <option key={status} value={status}>
                {status}
              </option>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenAddTask(false)}>Cancel</Button>
          <Button onClick={handleAddTask}>Add</Button>
        </DialogActions>
      </Dialog>
    </StyledPaper>
  );
}