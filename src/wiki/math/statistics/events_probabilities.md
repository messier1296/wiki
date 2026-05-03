---
title: "事象と確率"
description: "ベイズの定理や条件付き確率,期待値"
tags:
  - math
  - statistics
  - bayes_theorem
draft: false
created: 2026-05-03
updated: 2026-05-03
---
# 事象と確率

## 事象と確率

$$
\begin{aligned}
\left( \text{Aの確率} \right) & = P(A) = Pr(A) \\
\left( \text{Aの余事象} \right) & = A^{c} \\
\left( \text{A,Bの積事象} \right) & = A \cap B \\
\left( \text{A,Bの和事象} \right) & = A \cup B \\
\left( \text{空集合} \right) & = \varnothing \\
\left( \text{全集合} \right) & = \Omega
\end{aligned}
$$

$A$と$B$が背反($A \cap B = \varnothing$)ならば$P(A \cup B) = P(A) + P(B)$である.
特に$A$とその余事象は排反で$A \cup A^{c} = \Omega$より$P\left( A^{c} \right) = 1 - P(A)$である.

<div class="frame">
  <div class="frame-title">包除原理</div>

$A,B$が排反でない一般の場合
$$
P(A \cup B) = P(A) + P(B) - P(A \cap B)
$$
が成り立つ.

</div>

## 条件付き確率とベイズの定理

事象$A$の元で事象$B$の起こる確率を$P\left( B|A \right)$と表し**条件付き確率**という.
$$
P\left( B|A \right) = \frac{P(A \cap B)}{P(A)}
$$
と定義される.

<div class="frame">
  <div class="frame-title">独立性</div>

事象$A$と$B$が**独立**であるということは
$$
P(A \cap B) = P(A) \times P(B)
$$
が成り立つということである. 独立は条件付き確率の定義を用いて$P(B) = P\left( B|A \right)$と書くこともできる.

</div>

<div class="frame">
  <div class="frame-title">ベイズの定理</div>

条件付き確率において以下の式が成り立つ.
$$
P\left( A|B \right) = \frac{P\left( B|A \right)P(A)}{P(B)} = \frac{P\left( B|A \right)P(A)}{P\left( B|A \right)P(A) + P\left( B|A^{c} \right)P\left( A^{c} \right)}
$$

</div>

**(proof)**

条件付き確率の定義より
$$
P\left( A|B \right)P(B) = P(A \cap B) = P\left( B|A \right)P(A)
$$
両端辺を$P(B)$で割ることにより示された.

ベイズの定理は因果関係のある事象を推定する際に利用されることが多い. 具体的には

- $A$: あるメールが迷惑メールである事象

- $B$: ソフトが迷惑メールであると判定する事象

とする. このとき

- $P\left( A|B \right)$: 迷惑メールと判定した際に実際に迷惑メールである確率

- $P\left( B|A \right)$: 迷惑メールが迷惑メールと判定される確率

となる. 実際に知りたいのは$P\left( A|B \right)$だが直接集計を取って確率を求めることは難しい. しかし$P\left( B|A \right)$なら簡単に調べられるのでベイズの定理を用いて$P\left( A|B \right)$を求める事ができる.

$P(A)$をAの**事前確率**と呼び, $P\left( A|B \right)$を**事後確率**と呼ぶ.

<div class="frame">
  <div class="frame-title">ベイズの定理の拡張</div>

全事象$\Omega$が排反な事象$A_{1},\ldots,A_{k}$の和で表される場合 ($\Omega = A_{1} \cup \ldots \cup A_{k},A_{i} \cap A_{j} = \varnothing$)

$$
P\left( A_{i}|B \right) = \frac{P\left( B|A_{i} \right)P\left( A_{i} \right)}{\sum\limits_{j = 1}^{k}P\left( B|A_{j} \right)P\left( A_{j} \right)}
$$

</div>

3つの事象$A,B,C$について$P\left( A \cap B|C \right) = P\left( A|C \right)P\left( B|C \right)$が成り立つとき,$C$を与えた元で$A$と$B$は**条件付き独立**であるという.

## 期待値と分散

コインの裏表や明日の気温などのランダムに変動する変数を**確率変数**と呼ぶ.

<div class="frame">
  <div class="frame-title">離散型確率変数</div>

ある確率変数を$X$として$X$がある値$x$を取る確率$P(X = x)$を
$$p(x) = P(X = x)$$
と表し**確率関数**と呼ぶ.

$X$の**期待値**(平均値)$E\lbrack X\rbrack$:
$$
\mu = E\lbrack X\rbrack = \sum_{x}xp(x)
$$

$X$の**分散**$V\lbrack X\rbrack$:
$$
\sigma^{2} = V\lbrack X\rbrack = E\left\lbrack (X - \mu)^{2} \right\rbrack = \sum_{x}(x - \mu)^{2}p(x)
$$

</div>

**(分散の公式)**

$$
\begin{aligned}
V\lbrack X\rbrack & = E\left\lbrack X^{2} - 2X\mu + \mu^{2} \right\rbrack \\
 & = E\left\lbrack X^{2} \right\rbrack - 2\mu E\lbrack X\rbrack + \mu^{2} \\
 & = E\left\lbrack X^{2} \right\rbrack - 2\mu^{2} + \mu^{2} \\
 & = E\left\lbrack X^{2} \right\rbrack - \mu^{2}
\end{aligned}
$$
より$V\lbrack X\rbrack = E\left\lbrack X^{2} \right\rbrack - \mu^{2}$が成り立つ.

<div class="frame">
  <div class="frame-title">連続型確率変数</div>

これまで離散確率変数を話題にしてきたが, 連続確率変数でも同様のことが言える. 確率密度関数を
$$
f(x) = \lim\limits_{\varepsilon \rightarrow 0}\frac{P(x < X \leq x + \varepsilon)}{\varepsilon}
$$
と定義して和を積分に置き換える.

$$
\begin{array}{r}
E\lbrack X\rbrack = \int_{- \infty}^{\infty}xf(x)dx \\
V\lbrack X\rbrack = \int_{- \infty}^{\infty}(x - \mu)^{2}f(x)dx
\end{array}
$$

</div>
