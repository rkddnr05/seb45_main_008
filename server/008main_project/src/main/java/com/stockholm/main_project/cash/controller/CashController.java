package com.stockholm.main_project.cash.controller;

import com.stockholm.main_project.cash.dto.CashPatchDto;
import com.stockholm.main_project.cash.dto.CashPostDto;
import com.stockholm.main_project.cash.dto.CashResponseDto;
import com.stockholm.main_project.cash.entity.Cash;
import com.stockholm.main_project.cash.mapper.CashMapper;
import com.stockholm.main_project.cash.service.CashService;
import com.stockholm.main_project.member.entity.Member;
import com.stockholm.main_project.member.service.MemberService;
import com.stockholm.main_project.stock.service.StockHoldService;
import com.stockholm.main_project.stock.service.StockOrderService;
import io.swagger.v3.oas.annotations.media.Schema;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/cash")
public class CashController {

    private final CashMapper mapper;
    private final CashService cashService;
    private final MemberService memberService;
    private final StockHoldService stockHoldService;
    private final StockOrderService stockOrderService;

    public CashController(CashMapper mapper, CashService cashService, MemberService memberService, StockHoldService stockHoldService, StockOrderService stockOrderService) {
        this.mapper = mapper;
        this.cashService = cashService;
        this.memberService = memberService;
        this.stockHoldService = stockHoldService;
        this.stockOrderService = stockOrderService;
    }
    @PostMapping
    public ResponseEntity postCash(@Schema(implementation = CashPostDto.class)@Valid @RequestBody CashPostDto cashPostDto,
                                   @AuthenticationPrincipal Member member){

        // 현재 인증된 사용자 정보 가져오기
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        Member member = memberService.findMemberByEmail(auth.getPrincipal().toString());

        // DTO에서 Entity로 변환
        Cash cashToCreate = mapper.cashPostToCash(cashPostDto);

        // 사용자 정보 설정
        cashToCreate.setMember(member);

        Cash createdCash = cashService.createCash(cashToCreate);
        CashResponseDto responseDto = mapper.cashToCashResponseDto(createdCash);

        return new ResponseEntity<>(responseDto, HttpStatus.CREATED);
    }

    @PatchMapping("{cashId}")
    public ResponseEntity patchCash(@Schema(implementation = CashPatchDto.class)@PathVariable long cashId, @Valid @RequestBody CashPatchDto requestBody,
                                    @AuthenticationPrincipal Member member){
//        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
//        Member member = memberService.findMemberByEmail(auth.getPrincipal().toString());

//        stockOrderService.deleteStockOrdersByMemberId(member.getId());

        Cash cashToUpdate = mapper.cashPatchToCash(requestBody);

        cashToUpdate.setMember(member);

        requestBody.setCashId(cashId);

        Cash cash = cashService.updateCash(cashId, member, requestBody);
        stockHoldService.deleteStockHolds(member.getMemberId());
        stockOrderService.deleteStockOrders(member);

        return new ResponseEntity<>(mapper.cashToCashResponseDto(cash), HttpStatus.OK);
    }

    @GetMapping("{cashId}")
    private ResponseEntity getCash(@PathVariable long cashId){
        Cash response = cashService.findCash(cashId);

        return new ResponseEntity<>(mapper.cashToCashResponseDto(response), HttpStatus.OK);
    }
}