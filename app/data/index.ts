// 导入所有独立作品文件
import { p26022101 } from './projects/26022101';
import { v26022102 } from './projects/26022102';
import { p26022103} from './projects/26022103';

// 按ID映射（供详情页提取数据）
export const projectsData = {
  [p26022101.id]: p26022101,
  [v26022102.id]: v26022102,
  [p26022103.id]: p26022103,
  // 新增作品时，只需要在这里加一行：[新作品.id]: 新作品
};

// 作品列表（供首页渲染）
export const projectsList = [
  p26022101,
  v26022102,
  p26022103,
  // 新增作品时，在这里加新作品即可
];