
import {styled} from 'modules/styled.js'
import {Sx} from 'modules/styled-plus.js'

Sx.ul = styled('ul')`
  /* padding-left: .5rem; */
  & > li {
    position: relative;
    padding-left: 1.5rem;

    &:before {
      content: "\\2022";
      position: absolute;
      width: 1.5rem;
      left: 0; top: 0;
      text-align: center;
      /* padding-left: .5rem;
      padding-right: .5rem; */
    }
    & + li, & > ul { // アイテム間のスキマ
      margin-top: .25rem;
    }
  }
  & > ul {
    margin-left: 1rem;
  }
`;

Sx.ol = styled('ol')`
  counter-reset: t-counter;
  & > li {
    position: relative;
    padding-left: 2rem;

    &:before {
      counter-increment: t-counter;
      content: counter(t-counter) ".";
      position: absolute;
      width: 2rem;
      left: 0; top: 0;
      text-align: center;
      /* padding-left: .5rem;
      padding-right: .5rem; */
    }
    & + li, & > ol { // アイテム間のスキマ
      margin-top: .25rem;
    }
  }
  & > ol {
    margin-left: 1rem;
  }
`;

Sx.li = styled('li')();
