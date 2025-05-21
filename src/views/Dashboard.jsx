import { Container, Card } from "react-bootstrap";

const Dashboard = () => {
  return (
    <Container>
      <br />
      <Card style={{ height: 600 }}>
        <iframe
          title="estaditicas"
          width="100%"
          height="100%"
          src="https://app.powerbi.com/view?r=eyJrIjoiMzllMjhjZTQtNjg5OC00ZDE2LWIwYjAtMTQ5NGM0YmY1NjJkIiwidCI6ImU0NzY0NmZlLWRhMjctNDUxOC04NDM2LTVmOGIxNThiYTEyNyIsImMiOjR9"
          allowFullScreen="true"
        ></iframe>
      </Card>
    </Container>
  );
};

export default Dashboard;