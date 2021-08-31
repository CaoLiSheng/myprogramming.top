export type HOCDecrator<InjectProps> = <Props extends InjectProps>(
  Component: React.ComponentType<Props>
) => void;