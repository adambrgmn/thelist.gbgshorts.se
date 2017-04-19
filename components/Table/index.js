import styled from 'styled-components';

export const Table = styled.table`
  width: 100%;
  max-width: 100%;
  margin-bottom: 1rem;
  border-collapse: collapse;
  background-color: transparent;
  font-family: -apple-system, BlinkMacSystemFont, 'avenir next', avenir, 'helvetica neue', helvetica, ubuntu, roboto, noto, 'segoe ui', arial, sans-serif;
`;

export const Thead = styled.thead`
  box-sizing: inherit;
`;

export const Tbody = styled.tbody`
  box-sizing: inherit;
`;

export const Tr = styled.tr`
  box-sizing: inherit;
  opacity: ${({ checked }) => (checked ? '0.5' : '1')};

  &:hover { background-color: rgba(0, 0, 0, 0.075); }
  thead &:hover { background-color: transparent; }
`;

export const Th = styled.th`
  position: relative;
  vertical-align: top;
  padding: 0.75rem;
  text-align: ${({ center }) => (center ? 'center' : 'left')};
  border-top: 1px solid #eceeef;

  thead & {
    vertical-align: bottom;
    border-bottom: 2px solid #eceeef;
    border-top: none;
  }
`;

export const Td = styled.td`
  vertical-align: top;
  border-top: 1px solid #eceeef;
  padding: 0.75rem;
  text-align: ${({ center }) => (center ? 'center' : 'left')};

  thead & {
    vertical-align: bottom;
    border-bottom: 2px solid #eceeef;
  }
`;

export const TheadButton = styled.button`
  display: block;
  width: 100%;
  height: 100%;
  border: none;
  font-size: 1rem;
  font-weight: bold;
  text-align: ${({ center }) => (center ? 'center' : 'left')};
  background-color: transparent;
  cursor: pointer;

  &:focus { outline: none; }

  &::before {
    content: ${({ active }) => (active ? '"·"' : '""')};
    position: absolute;
    font-weight: bolder;
    top: 25%;
    left: 0%;
  }
`;

export const ButtonMark = styled.span`
  position: relative;

  &::after {
    content: "";
    position: absolute;
    font-weight: bolder;
    top: 50%;
    left: 110%;
    width: 3px;
    height: 3px;
    border-radius: 100%;
    background-color: ${({ active }) => (active ? 'currentColor' : 'transparent')};
  }
`;

export const TableActionButton = styled.button`
  width: 1rem;
  height: 1rem;
  margin: 0;
  border: none;
  font-size: 1rem;
  background-color: transparent;
  cursor: pointer;

  &:focus { outline: none; }
  &:hover { background-color: rgba(0, 0, 0, 0.075); }
`;
