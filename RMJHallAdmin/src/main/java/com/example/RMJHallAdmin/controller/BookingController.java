package com.example.RMJHallAdmin.controller;

import com.example.RMJHallAdmin.dto.DashBoardSummary;
import com.example.RMJHallAdmin.dto.EnquiryRequest;
import com.example.RMJHallAdmin.dto.UpdateEnquiryRequest;
import com.example.RMJHallAdmin.exception.ErrorResponse;
import com.example.RMJHallAdmin.model.BookingModel;
import com.example.RMJHallAdmin.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.example.RMJHallAdmin.dto.UpcomingBookingDTO;
import com.example.RMJHallAdmin.dto.RecentEnquiryDTO;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class BookingController {
    @Autowired
    BookingService bookingService;

    @PostMapping("/enquiry")
    public ResponseEntity<ErrorResponse> createEnquiry(
            @RequestBody EnquiryRequest enquiry) {

        bookingService.createsEnquiry(enquiry);

        return ResponseEntity.ok(
                new ErrorResponse(
                        "Added Successfully",
                        200,
                        LocalDateTime.now()
                )
        );
    }

    @GetMapping("/bookings")
    public List<BookingModel> getBookingbyDate(@RequestParam("eventDate") LocalDate localDate){
        return bookingService.getBookingbyDate(localDate);

    }
    @PostMapping("/bookings/{bookingId}/confirm")
    public ResponseEntity<ErrorResponse> confirmBooking(@PathVariable("bookingId") int bookingId){
        bookingService.confirm(bookingId);
        return ResponseEntity.ok(new ErrorResponse("Booking Confirmed Successfully",
                200,LocalDateTime.now()));

    }
    @PutMapping("/bookings/{id}/update")
    public ResponseEntity<ErrorResponse> updateBooking(
            @PathVariable long id,
            @RequestBody UpdateEnquiryRequest request
    ) {
        bookingService.updateEnquiry(id,
                request.getEventDate(),
                request.getStartTime(),
                request.getEndTime(),
                request.getNotes());
        return ResponseEntity.ok(new ErrorResponse("Updated Successfully",
                200,LocalDateTime.now()));
    }
    @GetMapping("/bookings/all")
    public List<BookingModel> getBookings(){
        return bookingService.getBookings();
    }

    @DeleteMapping("/bookings/{id}")
    public ResponseEntity<ErrorResponse> delete(@PathVariable long id) {
        bookingService.softDelete(id);
        return ResponseEntity.ok(new ErrorResponse("Deleted Successfully",
                200,LocalDateTime.now()));
    }
    @GetMapping("/dashboard/summary")
    public DashBoardSummary dashboard(){
        return bookingService.getsummary();
    }

    @GetMapping("/dashboard/upcoming")
    public List<UpcomingBookingDTO> getUpcomingBookings() {
        return bookingService.getUpcomingBookings();
    }

    @GetMapping("/dashboard/recent-enquiries")
    public List<RecentEnquiryDTO> getRecentEnquiries() {
        return bookingService.getRecentEnquiries();
    }


}
