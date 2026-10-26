package com.library.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.multipart;

import com.library.model.Book;
import com.library.repository.AuthorRepository;
import com.library.repository.BookRepository;
import com.library.repository.BorrowRecordRepository;
import com.library.repository.CategoryRepository;
import com.library.repository.PublisherRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

class BookControllerTest {

    private BookRepository bookRepository;
    private MockMvc mockMvc;

    @BeforeEach
    void setUp() {
        bookRepository = mock(BookRepository.class);
        when(bookRepository.save(any(Book.class))).thenAnswer(invocation -> invocation.getArgument(0));

        BookController controller = new BookController(
                bookRepository,
                mock(AuthorRepository.class),
                mock(PublisherRepository.class),
                mock(CategoryRepository.class),
                mock(BorrowRecordRepository.class));
        mockMvc = MockMvcBuilders.standaloneSetup(controller).build();
    }

    @Test
    void addBookDefaultsAvailableCopiesToOneForExistingClients() throws Exception {
        mockMvc.perform(multipart("/api/books").param("title", "The Hobbit"))
                .andExpect(status().isOk());

        ArgumentCaptor<Book> book = ArgumentCaptor.forClass(Book.class);
        verify(bookRepository).save(book.capture());
        assertEquals(1, book.getValue().getAvailableCopies());
    }

    @Test
    void addBookPersistsSubmittedAvailableCopies() throws Exception {
        mockMvc.perform(multipart("/api/books")
                .param("title", "The Hobbit")
                .param("availableCopies", "7"))
                .andExpect(status().isOk());

        ArgumentCaptor<Book> book = ArgumentCaptor.forClass(Book.class);
        verify(bookRepository).save(book.capture());
        assertEquals(7, book.getValue().getAvailableCopies());
    }
}
