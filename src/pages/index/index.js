import Head from '@/shared/components/head';

import styles from './style.less';
import Task from './task';

function Index() {
  return (
    <div className={styles.container}>
      <Head />
      <Task />
    </div>
  );
}

export default Index;
