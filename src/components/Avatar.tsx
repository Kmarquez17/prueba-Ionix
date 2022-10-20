let md5 = require("md5");

interface IProps {
  email: string;
  width: number;
}

export const Avatar: React.FunctionComponent<IProps> = (props: IProps) => {
  const hash = md5(props.email);
  return (
    <img
     style={{borderRadius:'50%', width: `${props.width}px`}}
      src={`https://www.gravatar.com/avatar/${hash}?d=identicon`}
      alt="Avatar"
    />
  );
};
