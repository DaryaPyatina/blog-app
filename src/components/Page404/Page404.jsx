import { Link } from "react-router-dom";
import { Result, Button } from "antd";

export const Page404 = () => (
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <Button type="primary">
        <Link to="/article">Back Home</Link>
      </Button>
    }
  />
);
