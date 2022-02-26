/* eslint-disable eslint-comments/disable-enable-pair */
/* eslint-disable no-plusplus */
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable promise/no-nesting */

async function awaitSome ( asyncFunc: () => Promise<boolean> ): Promise<void> {
  console.log ( 'await some called once!' );
  if ( await asyncFunc () ) {
    return awaitSome ( asyncFunc );
  }
}

function tooLateChecker ( timeout: number ): ( ( cb: () => boolean ) => boolean ) {
  const tooLateAfter = Date.now () + timeout;
  return ( cb: () => boolean ) => {
    if ( tooLateAfter < Date.now () ) {
      throw new Error ( 'TOO_LATE' );
    }
    return cb ();
  };
};

void awaitSome ( async () => tooLateChecker ( 1000 ) ( () => --downCounter > 0 ) );
