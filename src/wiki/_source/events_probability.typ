#metadata((
  title: "事象と確率",
  description: "事象、条件付き確率、ベイズの定理、期待値と分散の基本事項をまとめる。",
  tags: ("math", "statistics", "probability"),
  draft: false,
  created: "2026-05-03",
  updated: "2026-05-03",
))

#import "../../template.typ": cut, frame, setup
#show: setup



= 事象と確率

== 事象と確率

// 定義の整列
$
      ("Aの確率") & = P(A) = P r(A) \
    ("Aの余事象") & = A^c \
  ("A,Bの積事象") & = A inter B \
  ("A,Bの和事象") & = A union B \
       ("空集合") & = nothing \
       ("全集合") & = Omega \
$

#cut()

#h(1em)$A$と$B$が背反($A inter B = nothing$)ならば$P(A union B ) = P(A) + P(B)$である.
特に$A$とその余事象は排反で$A union A^c = Omega$より$P(A^c) = 1 - P(A)$である.

#frame(title: "包除原理")[
  $A,B$が排反でない一般の場合
  $ P(A union B) = P(A) + P(B) - P(A inter B) $
  が成り立つ.
]

== 条件付き確率とベイズの定理

#h(1em) 事象$A$の元で事象$B$の起こる確率を$P(B|A)$と表し*条件付き確率*という.
$ P(B|A) = P(A inter B) / P(A) $
と定義される.

#frame(title: "独立性")[
  事象$A$と$B$が*独立*であるということは
  $ P(A inter B) = P(A) times P(B) $
  が成り立つということである. 独立は条件付き確率の定義を用いて$P(B) = P(B|A)$と書くこともできる.
]

#frame(title: "ベイズの定理")[
  条件付き確率において以下の式が成り立つ.
  $
    P(A|B) = (P(B|A) P(A))/P(B) = (P(B|A) P(A)) / (P(B|A) P(A) + P(B|A^c)P(A^c))
  $
]

*(proof)*

条件付き確率の定義より
$ P(A|B) P(B) = P(A inter B) = P(B|A)P(A) $
両端辺を$P(B)$で割ることにより示された.

#cut()

#h(1em)ベイズの定理は因果関係のある事象を推定する際に利用されることが多い. 具体的には

#list(
  indent: 1em,
  [$A$: あるメールが迷惑メールである事象],
  [$B$: ソフトが迷惑メールであると判定する事象],
)

とする. このとき

#list(
  indent: 1em,
  [$P(A|B)$: 迷惑メールと判定した際に実際に迷惑メールである確率],
  [$P(B|A)$: 迷惑メールが迷惑メールと判定される確率],
)

となる. 実際に知りたいのは$P(A|B)$だが直接集計を取って確率を求めることは難しい. しかし$P(B|A)$なら簡単に調べられるのでベイズの定理を用いて$P(A|B)$を求める事ができる.

#h(1em)$P(A)$をAの*事前確率*と呼び, $P(A|B)$を*事後確率*と呼ぶ.

#frame(title: "ベイズの定理の拡張")[
  全事象$Omega$が排反な事象$A_1, dots ,A_k$の和で表される場合 ($Omega = A_1 union dots union A_k, A_i inter A_j = nothing$)

  $
    P(A_i|B) = (P(B|A_i) P(A_i)) / (limits(sum)_(j=1)^k P(B|A_j) P(A_j))
  $
]

#h(1em) 3つの事象$A,B,C$について$P(A inter B|C) = P(A|C) P(B|C)$が成り立つとき,$C$を与えた元で$A$と$B$は*条件付き独立*であるという.



== 期待値と分散

#h(1em)コインの裏表や明日の気温などのランダムに変動する変数を*確率変数*と呼ぶ.

#frame(title: "離散型確率変数")[
  ある確率変数を$X$として$X$がある値$x$を取る確率$P(X = x)$を
  $ p(x) = P(X = x) $
  と表し*確率関数*と呼ぶ.

  $X$の*期待値*(平均値)$E[X]$:
  $ mu = E[X] = sum_x x p(x) $

  $X$の*分散*$V[X]$:
  $ sigma^2 = V[X] = E[(X-mu)^2] = sum_x (x-mu)^2 p(x) $
]

*(分散の公式)*

$
  V[X] & = E[X^2 - 2X mu +mu^2] \
       & = E[X^2] - 2mu E[X] + mu^2 \
       & = E[X^2] - 2 mu^2 + mu^2 \
       & = E[X^2] - mu^2
$
より$V[X] = E[X^2] - mu^2$が成り立つ.

#frame(title: "連続型確率変数")[
  これまで離散確率変数を話題にしてきたが, 連続確率変数でも同様のことが言える. 確率密度関数を
  $ f(x) = lim_(epsilon arrow 0) P(x<X <= x+epsilon) / epsilon $
  と定義して和を積分に置き換える.

  $
    E[X] = integral_(-infinity)^infinity x f(x) d x \
    V[X] = integral_(-infinity)^infinity (x-mu)^2 f(x) d x
  $
]
