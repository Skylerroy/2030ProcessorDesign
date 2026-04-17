# 符号与约定

## 通用符号 {#通用符号 .unnumbered}

|                        |                                                                        |
|:-----------------------|:-----------------------------------------------------------------------|
| $f$                    | 时钟频率（Hz）                                                         |
| $T$                    | 时钟周期（s），$T = 1/f$                                               |
| $\mathrm{CPI}$         | 每条指令的平均时钟周期数（Cycles Per Instruction）                     |
| $\mathrm{IPC}$         | 每周期指令数（Instructions Per Cycle），$\mathrm{IPC}= 1/\mathrm{CPI}$ |
| $N$                    | 流水线级数或发射宽度（视上下文而定）                                   |
| $W$                    | 发射/提交宽度                                                          |
| $n$                    | 指令数量                                                               |
| $r_{\mathrm{miss}}$    | 缺失率                                                                 |
| $r_{\mathrm{hit}}$     | 命中率，$r_{\mathrm{hit}}= 1 - r_{\mathrm{miss}}$                      |
| $t_{\mathrm{penalty}}$ | 缺失惩罚（时钟周期数）                                                 |
| $\mathrm{Speedup}$     | 加速比                                                                 |

## 缩略语 {#缩略语 .unnumbered}

|      |                                                                       |
|:-----|:----------------------------------------------------------------------|
| ALU  | 算术逻辑单元（Arithmetic Logic Unit）                                 |
| AGU  | 地址生成单元（Address Generation Unit）                               |
| BHT  | 分支历史表（Branch History Table）                                    |
| BTB  | 分支目标缓冲区（Branch Target Buffer）                                |
| CPI  | 每指令周期数（Cycles Per Instruction）                                |
| CXL  | 计算快速链接（Compute Express Link）                                  |
| DVFS | 动态电压频率调节（Dynamic Voltage and Frequency Scaling）             |
| FMA  | 融合乘加（Fused Multiply-Add）                                        |
| GAA  | 全环绕栅极（Gate-All-Around）                                         |
| HBM  | 高带宽存储器（High Bandwidth Memory）                                 |
| ILP  | 指令级并行性（Instruction-Level Parallelism）                         |
| ISA  | 指令集架构（Instruction Set Architecture）                            |
| LLC  | 末级缓存（Last-Level Cache）                                          |
| LSQ  | 加载/存储队列（Load/Store Queue）                                     |
| MSHR | 缺失状态保持寄存器（Miss Status Holding Register）                    |
| NoC  | 片上网络（Network-on-Chip）                                           |
| OoO  | 乱序执行（Out-of-Order）                                              |
| PPA  | 性能-功耗-面积（Performance-Power-Area）                              |
| PRF  | 物理寄存器文件（Physical Register File）                              |
| PTW  | 页表遍历器（Page Table Walker）                                       |
| RAT  | 寄存器别名表（Register Alias Table）                                  |
| ROB  | 重排序缓冲区（Reorder Buffer）                                        |
| RAS  | 返回地址栈（Return Address Stack）                                    |
| SMT  | 同时多线程（Simultaneous Multithreading）                             |
| SoC  | 片上系统（System-on-Chip）                                            |
| TAGE | 标记化几何历史长度预测器（TAgged GEometric history length predictor） |
| TLB  | 翻译后备缓冲区（Translation Lookaside Buffer）                        |
| UCIe | 通用芯粒互连快速通道（Universal Chiplet Interconnect express）        |

## 排版约定 {#排版约定 .unnumbered}

- 寄存器名使用等宽字体：`x5`、`sp`

- 信号名使用等宽字体：`MemWrite`、`RegDst`

- 指令助记符使用粗体等宽字体：**`ADD`**、**`LW`**

- 指令字段使用无衬线字体：`funct3`、`opcode`

- 首次出现的重要术语以中文（英文）格式标注，并收入索引
