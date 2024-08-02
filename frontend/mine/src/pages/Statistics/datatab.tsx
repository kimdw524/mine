/** @jsxImportSource @emotion/react */
import {
  headerCss,
  titleCss,
} from './datatab.style';


type DataTabTypes = {
  title: JSX.Element;
  leftChild: React.ReactNode;
  rightChild: React.ReactNode;
};

const DataTab: React.FC<DataTabTypes> = ({ title, leftChild, rightChild }) => {
  return (
    <div css={headerCss}>
      <div>{leftChild}</div>
      <div css={titleCss}>{title}</div>
      <div>{rightChild}</div>
    </div>
  );
};

export default DataTab;
