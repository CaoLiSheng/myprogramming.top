---
style: antique
title: 读书笔记之《Java I/O, NIO, and NIO.2》
date: 2021-02-06
tags:
  - 读书
  - 笔记
  - Java I/O
  - Java NIO
  - Java NIO.2
---

## IO Basics & APIs

I/O is fundamental to operating systems, computer languages, and language libraries. Java supports I/O through its classic I/O, NIO, and NIO.2 API categories.

Classic I/O provides APIs to access the file system, access file content randomly (as opposed to sequentially), stream byte-oriented data between sources and destinations, and support character streams.

NIO provides APIs to manage buffers, communicate buffered data over channels, leverage readiness selection via selectors, scan textual data quickly via regular expressions, specify character encodings via charsets, and support printf-style formatting.

NIO.2 provides APIs to improve the file system interface; support asynchronous I/O; and complete socket channel functionality by upgrading DatagramChannel, ServerSocketChannel, and SocketChannel, and by introducing a new MulticastChannel interface.

## File

The File class provides access to the underlying operating system’s available file system(s). Each File instance stores the abstract path for some file system object. Various File methods (such as void delete()) affect the file system object represented by the abstract path.

First, learned how to construct File instances. Then, explored methods for obtaining information about stored abstract paths and their files or directories, obtaining a list of roots and disk space, listing directories, creating/modifying files/directories, setting/getting permissions, and more.

## RandomAccessFile

Files can be opened for random access in which a mixture of write and read operations at various locations can occur until the file is closed.
Java supports this random access by providing the RandomAccessFile class (in the java.io package).

First, learned about RandomAccessFile’s constructors, operation modes, and the file pointer.
Then, explored a sample of this class’s methods.
Next, learned about the FileDescriptor class and its methods.
Lastly, learned how to use RandomAccessFile to create a flat file database.

## Streams

Java uses streams to perform I/O operations. A stream is an ordered sequence of bytes of an arbitrary length. Bytes flow over an output stream from an application to a destination and flow over an input stream from a source to an application.

The java.io package provides several classes that identify various stream destinations and sources. These classes are descendants of the abstract OutputStream and InputStream classes. FileOutputStream and BufferedInputStream are examples.

Explored OutputStream and InputStream, followed by the byte array, file, piped, filter, buffered, data, object, and print streams. While covering object streams, it introduced the topics of serialization and externalization. Concluded by revisiting standard I/O.

![Overviews](Java-IO-NIO-NIO2/Streams.png '=666px-')

Tell the serialization and deserialization mechanisms to serialize or deserialize the object’s normal state before serializing or deserializing additional data items by first calling ObjectOutputStream’s defaultWriteObject() method in writeObject(ObjectOutputStream) or by first calling ObjectInputStream’s defaultReadObject() method in readObject(ObjectInputStream).

## Writers and Readers

Java’s stream classes are good for streaming sequences of bytes, but they’re not good for streaming sequences of characters because bytes and characters are two different things. A byte represents an 8-bit data item and a character represents a 16-bit data item. Also, Java’s char and String types naturally handle characters instead of bytes. More importantly, byte streams have no knowledge of character sets and their encodings.

Java provides writer and reader classes to stream characters. They support character I/O (they work with char instead of byte) and take character encodings into account. The abstract Writer and Reader classes describe what it means to be a writer and a reader.

Writer and Reader are subclassed by OutputStreamWriter and InputStreamReader, which bridge the gap between character and byte streams. These classes are subclassed by the FileWriter and FileReader convenience classes, which facilitate writing/reading characters to/from files. Writer and Reader are also subclassed by BufferedWriter and BufferedReader, which buffer characters for efficiency.

![Overviews](Java-IO-NIO-NIO2/Writers&Readers.png '=666px-')

## Buffers

A buffer is an NIO object that stores a fixed amount of data to be sent to or received from an I/O service. It sits between an application and a channel that writes the buffered data to the service or reads the data from the service and deposits it into the buffer.

Buffers possess capacity, limit, position, and mark properties. These four properties are related as follows: 0 <= mark <= position <= limit <= capacity.

Buffers are implemented by abstract classes that derive from the abstract Buffer class. These classes include ByteBuffer, CharBuffer, DoubleBuffer, FloatBuffer, IntBuffer, LongBuffer, and ShortBuffer. Furthermore, ByteBuffer is subclassed by the abstract MappedByteBuffer class.

In this chapter, learned how to create buffers (including view buffers), write and read buffer contents, flip buffers, mark buffers, and perform additional operations on buffers such as compaction. Also learned about byte ordering and direct byte buffers.

## Channels

Channels partner with buffers to achieve high-performance I/O. A channel is an object that represents an open connection to a hardware device, a file, a network socket, an application component, or another entity that’s capable of performing write, read, and other I/O operations. Channels efficiently transfer data between byte buffers and operating system-based I/O service sources or destinations.

Java supports channels by providing the Channel interface, its WritableByteChannel and ReadableByteChannel subinterfaces, the Channels class, and other types in the java.nio.channels package. While exploring this package, learned about scatter/gather I/O, file channels (in terms of the FileChannel class with emphasis on its file locking, memory-mapped file I/O, and byte-transfer capabilities), socket channels, and pipes.

## Selectors

A selector is an object created from a subclass of the abstract Selector class. The selector maintains a set of channels that it examines to determine which channels are ready for reading, writing, completing a connection sequence, accepting another connection, or some combination of these tasks.

Selectors are used with selectable channels, which are objects whose classes ultimately inherit from the abstract SelectableChannel class, which describes a channel that can be multiplexed by a selector.

One or more previously created selectable channels are registered with a selector. Each registration returns an instance of a subclass of the abstract SelectionKey class, which is a token signifying the relationship between one channel and the selector. When a selection method is invoked, the selector’s associated keys are updated by checking all channels registered with that selector. The application can then obtain a set of keys whose channels were found ready and iterate over these keys to service each channel that has become ready since the previous select method call.

## Regular Expressions

Text-processing applications often need to match text against patterns. NIO includes regular expressions to help these applications perform pattern matching with high performance. Java supports regular expressions by providing the Pattern, PatternSyntaxException, and Matcher classes.

In this chapter, explored Pattern, PatternSyntaxException, and Matcher. Then, learned about character classes, capturing groups, boundary matchers and zero-length matches, and quantifiers. Finally, observed a practical use case for regexes: phone number matching.

> 虽然现在经常用正则表达式，但是一些小细节还是忽略了。
> 比如，
> 1）字符类有六种，分别是简单、非、区间、联合、并集、差集。尤其差集，是以前忽略的。
> 2）组可以用反斜线加数字被引用
> 3）边界匹配原以为只有开头和结尾，现在知道还有词的边界和内部，段落开头和结尾等
> 4）匹配到零长度字符串的概念
> 5）量词匹配仅原来只知道贪心和最短，现在知道还有一种所有格量词

## Charsets

Charsets combine coded character sets with character-encoding schemes. They’re used to translate between byte sequences and the characters that are encoded into these sequences. Java supports charsets by providing Charset and related classes. It also uses charsets with the String class.

## Formatter

JDK 5 introduced the Formatter class as an interpreter for printf()-style format strings. This class provides support for layout justification and alignment; common formats for numeric, string, and date/time data; and more. Commonly used Java types (such as byte and BigDecimal) are supported.

Formatter declares several constructors for creating Formatter objects. These constructors let you specify where you want formatted output to be sent. For example, Formatter() writes formatted output to an internal StringBuilder instance. You can access the destination by calling Formatter’s Appendable out() method.

After creating a Formatter object, call a format() method to format a varying number of values. For example, Formatter format(String format, Object... args) formats the args array according to the string of format specifiers passed to the format parameter, and returns a reference to the invoking Formatter so that you can chain the format() calls together.

It’s cumbersome to have to create and manage a Formatter object when all you want to do is achieve something equivalent to the C language’s printf() function. Java addresses this situation by adding format() and equivalent printf() methods (such as PrintStream printf(String format, Object... args)) to the PrintStream class.

Formatter is accompanied by a Formattable interface and a FormattableFlags class that collectively support limited formatting customization for arbitrary user-defined types. Formattable is implemented by any class that needs to perform custom formatting using Formatter’s “s” (format argument as string) conversion character.

## Improved File System Interface

NIO.2 improves the file system interface that was previously limited to the File class. The improved file system interface features methods throwing exceptions, support for symbolic links, broad and efficient support for file attributes, directory streams, support for alternative file systems via custom file system providers, support for file copying and file moving, support for walking the file tree/visiting files and watching directories, and more.

The improved file system interface is implemented mainly by the various types in the java.nio.file, java.nio.file.attribute, and java.nio.file.spi packages. FileSystem, FileSystems, and FileSystemProvider form the core of the improved file system interface.

![Overviews](Java-IO-NIO-NIO2/AttrViews.png '=333px-')

## Asynchronous I/O

Asynchronous I/O lets client code initiate an I/O operation and subsequently notifies the client when the operation is complete. The AsynchronousChannel interface describes an asynchronous channel that supports asynchronous I/O operations (reads, writes, and so on). An I/O operation is initiated by calling a method that returns a Future or requires a CompletionHandler argument.

CompletionHandler declares a completed() method to consume the result of an operation when it completes successfully. It also declares a failed() method to report operation failure (in terms of an exception) and allow an application to take appropriate action.

The AsynchronousByteChannel interface extends AsynchronousChannel and declares a pair of read() methods and a pair of write() methods. Each pair consists of a method that returns a Future and a method that requires a CompletionHandler argument.

The abstract AsynchronousFileChannel class describes an asynchronous channel for reading, writing, and manipulating a file. The abstract AsynchronousServerSocketChannel class describes an asynchronous channel for stream-oriented listening sockets. Its counterpart channel for stream-oriented connecting sockets is described by the abstract AsynchronousSocketChannel class.

The abstract AsynchronousChannelGroup class describes a grouping of asynchronous channels for the purpose of resource sharing. A group has an associated thread pool to which tasks are submitted, to handle I/O events and to dispatch to completion handlers that consume the results of asynchronous operations performed on the group’s channels.

AsynchronousServerSocketChannels and AsynchronousSocketChannels created via their noargument open() methods are bound to the default group. They can be bound to groups created from AsynchronousChannelGroup's class methods by passing these group objects to their open(AsynchronousChannelGroup) methods.

AsynchronousFileChannels don't belong to groups. However, they are associated with a default thread pool, which can be configured or replaced.

## Completion of Socket Channel Functionality

JDK 7 completed socket channel functionality by extending the DatagramChannel, ServerSocketChannel, and SocketChannel classes to support binding and option configuration. These capabilities are declared in the NetworkChannel interface, which these and other classes implement.

JDK 7 also completed socket channel functionality by introducing support for channel-based multicasting. This support consists of MulticastChannel (an interface that extends NetworkChannel), the MembershipKey class, and an open(ProtocolFamily) method in the DatagramChannel class.

## 新的疑惑

通读这本书后，解开了自从大一学 Java 一来积攒的很多疑惑，主要原因是
1）没有大二计算机组成原理、操作系统、计算机网络的基础，不小心走了弯路；
2）之后的职业生涯转到了别的技术栈。
同样由于我薄弱的底子，对于至少以下两个问题是心存疑惑的：
1）SocketChannel 的读写都使用 ByteBuffer，而 option 中可以设置 buffer size。虽然，我觉得 option 中设置的那个不止包含业务数据，还有底层数据包拼出来的开头结尾。疑惑在于，大多少合适呢？还有就是，小了会怎样呢？
2）组播用到的 D 类 IP 地址，连上就能用，不收费的吗？
