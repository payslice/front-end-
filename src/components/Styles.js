
import styled from 'styled-components'

export const Styles = styled.div`

    width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: auto;
  /* margin: 1rem; */

  table {
    border-spacing: 0;
    border-bottom: 1px solid #b3b3b3;
    width: '100%';

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
      :first-child {
        th {
        /* border-left: 1px solid #b3b3b3;   
        border-right: 1px solid #b3b3b3;    */
            background: none;
        }
      }
    }
    th {
        background-color: rgba(242, 242, 242, 0.5);
        font-size: 13px;
        color: rgba(17, 17, 17, 0.8);
        text-transform: capitalize;
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid #E1E4E9;
      padding-top: 20px;
      padding-bottom: 20px;
        font-size: 12px;
      /* border-right: 1px solid #d9d9d9; */

      :last-child {
        border-right: 0;
      }
    }
  }
`