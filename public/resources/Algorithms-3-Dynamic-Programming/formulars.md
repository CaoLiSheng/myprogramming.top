$$
\begin{bmatrix} 0 & 1 \\ 1 & 1 \end{bmatrix}^n =
\begin{bmatrix} 0 & 1 \\ 1 & 1 \end{bmatrix}^m
\begin{bmatrix} 0 & 1 \\ 1 & 1 \end{bmatrix}^{n-m}
$$

$$
\begin{bmatrix} F_m & F_{m+1} \end{bmatrix} =
  \begin{bmatrix} 0 & 1 \end{bmatrix}
  \begin{bmatrix} 0 & 1 \\ 1 & 1 \end{bmatrix}^m
$$

$$
\begin{bmatrix} 0 & 1 \\ 1 & 1 \end{bmatrix}^n
\begin{bmatrix} 1 \\ 0 \end{bmatrix}
  = \begin{bmatrix} F_{n-1} \\ F_n \end{bmatrix}
$$

$$
\begin{alignedat}{1}
F_n &
=
\begin{bmatrix} 0 & 1 \end{bmatrix}
\begin{bmatrix} F_{n-1} \\ F_n \end{bmatrix}
\\

&
=
\begin{bmatrix} 0 & 1 \end{bmatrix}
\begin{bmatrix} 0 & 1 \\ 1 & 1 \end{bmatrix}^n
\begin{bmatrix} 1 \\ 0 \end{bmatrix}
\\

&
=
\begin{bmatrix} 0 & 1 \end{bmatrix}
\begin{bmatrix} 0 & 1 \\ 1 & 1 \end{bmatrix}^m
\begin{bmatrix} 0 & 1 \\ 1 & 1 \end{bmatrix}^{n-m}
\begin{bmatrix} 1 \\ 0 \end{bmatrix}
\\

&
=
\begin{bmatrix} F_m & F_{m+1} \end{bmatrix}
\begin{bmatrix} F_{n-m-1} \\ F_{n-m} \end{bmatrix}
\\

&
=
F_m \times F_{n-m-1} + F_{m+1} \times F_{n-m}
\end{alignedat}
$$

$$
\begin{alignedat}{1}
F_{2t-1}
&
= F_{t-1} \times F_{2t-1-(t-1)-1} + F_{(t-1)+1} \times F_{2t-1-(t-1)}
\\

&
= F_{t-1}^2 + F_{t}^2
\\

F_{2t}
&
= F_t \times F_{2t-t-1} + F_{t+1} \times F_{2t-t}
\\

&
= F_t \times (F_{t-1} + F_{t+1})
\\

&
= F_t \times (F_{t-1} + F_t + F_{t-1})
\\

&
= F_t \times (2 \times F_{t-1} + F_t)
\end{alignedat}
$$
