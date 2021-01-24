---
style: antique
title: 读书笔记之《Java I/O, NIO, and NIO.2》
date: 2021-01-25
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

![Overviews](Book-Java-IO-NIO-NIO2/Overviews.png '=666px-')
