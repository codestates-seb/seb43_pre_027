import styled from 'styled-components';
import { ReactComponent as Alert } from '../Assets/icon/alert.svg';

const FormGroup = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 5px;
    font-size: 15px;
    font-weight: 700;
  }

  .input-group {
    input {
      width: 100%;
      padding: 7px 9px;
      border: 1px solid #babfc4;
      border-radius: 3px;
      outline: none;

      :focus {
        border-color: #0a95ff;
        outline: 4px solid #0a95ff27;
      }
    }
  }

  svg,
  p {
    display: none;
  }

  p {
    font-size: 12px;
  }

  &.alert-on {
    .input-group {
      margin-bottom: 5px;
      position: relative;

      input {
        border-color: #de4f54;

        :focus {
          border-color: #de4f54;
          outline: 4px solid #de4f5433;
        }
      }

      svg {
        position: absolute;
        top: 7px;
        right: 8px;
      }
    }

    svg,
    p {
      display: block;
    }

    p {
      color: #de4f54;
    }
  }
`;

function AuthInput({ label, type, id, alert }) {
  return (
    <FormGroup className={alert ? 'alert-on' : ''}>
      <label htmlFor={id}>{label}</label>
      <div className="input-group">
        <input type={type} id={id} />
        <Alert />
      </div>
      <p>{alert}</p>
    </FormGroup>
  );
}

export default AuthInput;
