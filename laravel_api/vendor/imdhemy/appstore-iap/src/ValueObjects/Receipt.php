<?php

namespace Imdhemy\AppStore\ValueObjects;

/**
 * Receipt Class
 * This class represents the decoded version of the encoded receipt data sent
 * with the request to the App Store.
 * @link https://developer.apple.com/documentation/appstorereceipts/responsebody/receipt
 */
final class Receipt
{
    public const RECEIPT_TYPE_PRODUCTION = 'Production';
    public const RECEIPT_TYPE_PRODUCTION_VPP = 'ProductionVPP';
    public const RECEIPT_TYPE_SANDBOX = 'ProductionSandbox';
    public const RECEIPT_TYPE_PRODUCTION_VPP_SANDBOX = 'ProductionVPPSandbox';

    /**
     * @var string|null
     * @see \Imdhemy\AppStore\ValueObjects\Receipt::$appItemId
     */
    private ?string $adamId;

    /**
     * Originally, this is 64-bit long integer, so, let's treat is a string
     * to be in the safe side.
     * Generated by App Store Connect and used by the App Store to
     * uniquely identify the app purchased.
     * Apps are assigned this identifier only in production.
     * @var string|null
     */
    private ?string $appItemId;

    /**
     * The app’s version number. In the sandbox, the value is always "1.0".
     * @var string|null
     */
    private ?string $applicationVersion;

    /**
     * The bundle identifier for the app to which the receipt belongs.
     * @var string|null
     */
    private ?string $bundleId;

    /**
     * A unique identifier for the app download transaction.
     * @var int|null
     */
    private ?int $downloadId;

    /**
     * The time the receipt expires for apps purchased through the Volume Purchase Program
     * @var int|null
     */
    private ?int $expirationDate;

    /**
     * An array that contains the in-app purchase receipt fields for all in-app purchase transactions.
     * @var array|null
     */
    private ?array $inApp;

    /**
     * The version of the app that the user originally purchased.
     * @var string|null
     */
    private ?string $originalApplicationVersion;

    /**
     * The time of the original app purchase
     * @var int|null
     */
    private ?int $originalPurchaseDate;

    /**
     * The time the user ordered the app available for pre-order.
     * @var int|null
     */
    private ?int $preOrderDate;

    /**
     * The time the App Store generated the receipt
     * @var int|null
     */
    private ?int $receiptCreationDate;

    /**
     * The type of receipt generated.
     * The value corresponds to the environment in which the app or VPP purchase was made
     * @var string|null
     */
    private ?string $receiptType;

    /**
     * The time the request to the verifyReceipt endpoint was processed and the response was generated
     * @var int|null
     */
    private ?int $requestDate;

    /**
     * An arbitrary number that identifies a revision of your app.
     * In the sandbox, this key's value is “0”
     * @var int|null
     */
    private ?int $versionExternalIdentifier;

    /**
     * @var bool
     */
    private bool $inAppParsed;

    /**
     * Receipt Constructor
     */
    public function __construct()
    {
        $this->inAppParsed = false;
    }

    /**
     * @param array $attributes
     * @return static
     */
    public static function fromArray(array $attributes): self
    {
        $obj = new self();
        $obj->adamId = $attributes['adam_id'] ?? null;
        $obj->appItemId = $attributes['app_item_id'] ?? null;
        $obj->applicationVersion = $attributes['application_version'] ?? null;
        $obj->bundleId = $attributes['bundle_id'] ?? null;
        $obj->downloadId = $attributes['download_id'] ?? null;
        $obj->inApp = $attributes['in_app'] ?? null;
        $obj->originalPurchaseDate = $attributes['original_purchase_date_ms'] ?? null;
        $obj->receiptCreationDate = $attributes['receipt_creation_date_ms'] ?? null;
        $obj->receiptType = $attributes['receipt_type'] ?? null;
        $obj->requestDate = $attributes['request_date_ms'] ?? null;
        $obj->versionExternalIdentifier = $attributes['version_external_identifier'] ?? null;
        $obj->originalApplicationVersion = $attributes['original_application_version'] ?? null;
        $obj->expirationDate = $attributes['expiration_date_ms'] ?? null;
        $obj->preOrderDate = $attributes['preorder_date_ms'] ?? null;

        return $obj;
    }

    /**
     * @return string|null
     */
    public function getAdamId(): ?string
    {
        return $this->adamId;
    }

    /**
     * @return string|null
     */
    public function getAppItemId(): ?string
    {
        return $this->appItemId;
    }

    /**
     * @return string|null
     */
    public function getApplicationVersion(): ?string
    {
        return $this->applicationVersion;
    }

    /**
     * @return string|null
     */
    public function getBundleId(): ?string
    {
        return $this->bundleId;
    }

    /**
     * @return int|null
     */
    public function getDownloadId(): ?int
    {
        return $this->downloadId;
    }

    /**
     * @return Time|null
     */
    public function getExpirationDate(): ?Time
    {
        return
            $this->expirationDate ?
                new Time($this->expirationDate) :
                null;
    }

    /**
     * @return array|LatestReceiptInfo[]|null
     */
    public function getInApp(): ?array
    {
        if (is_null($this->inApp) || $this->inAppParsed) {
            return $this->inApp;
        }

        $data = [];
        foreach ($this->inApp as $receiptData) {
            $data[] = LatestReceiptInfo::fromArray($receiptData);
        }

        $this->inAppParsed = true;
        $this->inApp = $data;

        return $this->inApp;
    }

    /**
     * @return string|null
     */
    public function getOriginalApplicationVersion(): ?string
    {
        return $this->originalApplicationVersion;
    }

    /**
     * @return Time|null
     */
    public function getOriginalPurchaseDate(): ?Time
    {
        return
            $this->originalPurchaseDate ?
                new Time($this->originalPurchaseDate) :
                null;
    }

    /**
     * @return Time|null
     */
    public function getPreOrderDate(): ?Time
    {
        return
            $this->preOrderDate ?
                new Time($this->preOrderDate) :
                null;
    }

    /**
     * @return Time|null
     */
    public function getReceiptCreationDate(): ?Time
    {
        return
            $this->receiptCreationDate ?
                new Time($this->receiptCreationDate) :
                null;
    }

    /**
     * @return string|null
     */
    public function getReceiptType(): ?string
    {
        return $this->receiptType;
    }

    /**
     * @return Time|null
     */
    public function getRequestDate(): ?Time
    {
        return
            $this->requestDate ?
                new Time($this->requestDate) :
                null;
    }

    /**
     * @return int|null
     */
    public function getVersionExternalIdentifier(): ?int
    {
        return $this->versionExternalIdentifier;
    }
}