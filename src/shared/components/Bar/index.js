import { useState, useEffect } from "react";
import { Skeleton } from "@douyinfe/semi-ui";
import * as taskApi from "@/apis/task";
import * as recordApi from "@/apis/record";
import useThemeContext from "@/shared/hooks/useThemeContext";

import styles from "./style.less";

// 将一万小时换算为分钟
const target = 10000 * 60;

function Bar() {
  const themeContext = useThemeContext();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      // TODO: 云对象的单次最大查询长度为1000条，后续需要优化

      // 得到当前用户的所有任务
      const taskRes = await taskApi.list();
      const pros = taskRes.data.map((task) =>
        recordApi.totalValue({ name: task.name }).then((value) => ({
          name: task.name,
          value,
        }))
      );
      const resList = await Promise.all(pros);
      setItems(resList);
      setLoading(false);
    };

    loadData();
  }, []);

  const placeholder = (
    <div>
      <Skeleton.Image style={{ height: 137 }} />
    </div>
  );

  return (
    <div className={styles[themeContext.state]}>
      <Skeleton placeholder={placeholder} loading={loading} active>
        {items.map((item) => (
          <div key={item.name} className={styles.item}>
            <div className={styles.title}>
              {item.name} 1万小时定律（{parseInt(item.value / 60)}/10000）
            </div>
            <div className={styles.barContainer}>
              <div
                className={styles.bar}
                style={{ width: `${(item.value / target) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </Skeleton>
    </div>
  );
}

export default Bar;
